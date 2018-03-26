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
  return node.name.getText()
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
