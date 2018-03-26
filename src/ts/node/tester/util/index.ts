import * as ts from 'typescript'
import {
  keysOf,
  toList,
  isStr
} from '../../../util'

const testMethodMap = {
  find: ['one', 'any', 'anyOf', 'oneOf'],
  every: ['exactly', 'all', 'allOf'],
  some: ['some']
}

export function decoratorName(node: any) {
  return 'unknown'
}

export function stringifyObj(obj: any) {
  return JSON.stringify(obj, null, 2)
}

export function queryNode(node: any, query: any, tester?: Function) {
  const testFun = tester || testName
  const result = arrayTestMethod(query)
  if (!result) return false
  const queryPart = query[result.keyName] || query.named
  if (!queryPart) return false
  return toList(queryPart)[result.method]((name: string) => {
    const named = testFun(node, name)
    return named ? {
      node,
      name,
      match: named
    } : false
  })
}

export function nameOf(node: any) {
  const name = node.name || node
  return name.getText()
}

// TODO: cache keys for next lookup in same enum?
export function enumKey(enumRef: any, enumValue: any) {
  for (var enumMember in enumRef) {
    if (enumRef[enumMember] == enumValue) return enumMember
  }
  return undefined
}

export function literalTypeName(node: any): string {
  const kind = node.kind || node
  return enumKey(ts.SyntaxKind, kind) || 'any'
}

export function initializerDetails(node: any) {
  const initializer = node.initializer
  if (!initializer) return {}

  const type = normalizeLiteral(literalTypeName(initializer))
  let textValue = initializer.getText()
  let value

  if (type === 'number') {
    value = parseInt(textValue)
  }
  if (type === 'boolean') {
    value = Boolean(textValue)
  }

  return {
    type,
    value,
    textValue
  }
}

const literalMap = {
  numeric: 'number'
}

export function normalizeLiteral(literal: string) {
  const $literal = literal.replace(/Literal/, '').replace(/Expression/, '').toLowerCase()
  return literalMap[$literal] || $literal
}

export function normalizeKeword(keyword: string) {
  return keyword.replace(/Keyword$/, '').toLowerCase()
}

export function typeName(node: any) {
  const type = node.type || node
  const key = enumKey(ts.SyntaxKind, type.kind || type)
  return key ? normalizeKeword(key) : 'any'
}

export function idDetails(node: any) {
  return {
    type: typeName(node),
    name: nameOf(node),
    init: initializerDetails(node)
  }
}

export function nameMatch(nodeName: string, name: string | RegExp) {
  return name instanceof RegExp ? name.test(nodeName) : name === nodeName
}

export function createNameTest(nameQuery: any) {
  return (nodeName: string) => {
    const nameMatchers = nameQuery.anyOf || []
    return nameMatchers.find((match: string | RegExp) => {
      return nameMatch(nodeName, match)
    })
  }
}

export function testNames(names: string[], query: any): any[] {
  query = query.name || query
  return names.map(createNameTest(query))
}

export function testName(name: any, query: any): boolean {
  name = isStr(name) ? name : nameOf(name)
  return createNameTest(query.name || query)(name)
}


export function testNot(query: any, tester: Function) {
  if (!query) return true
  return query.not ? !Boolean(tester(query.not)) : tester(query)
}

// TODO
export function orQuery(query: any, tester: Function) {
  throw new Error('Not yet implemented')
}

export function testOr(query: any, tester: Function) {
  if (!query) return true
  return query.or ? orQuery(query.or, tester) : tester(query)
}

export function arrayTestMethod(obj: any, options: any = {}): any {
  const {
    error
  } = options
  if (!obj) return
  const keys: string[] = keysOf(obj)
  const methodKeys: string[] = Object.keys(testMethodMap)
  let keyName
  const method = methodKeys.find((methodKey: string) => {
    keyName = keys.find(key => {
      return testMethodMap[methodKey].includes(key)
    })
    return Boolean(keyName)
  })
  const result = {
    method,
    keyName
  }
  return method && result || error && error(`arrayTestMethod: Invalid ${obj}`)
}
