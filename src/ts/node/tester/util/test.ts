import {
  keysOf,
  isStr
} from '../../../util'

import {
  createNameTest,
  nameOf
} from './name'

const testMethodMap = {
  find: ['one', 'any', 'anyOf', 'oneOf'],
  every: ['exactly', 'all', 'allOf'],
  some: ['some']
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

export function testNames(names: string[], query: any): any[] {
  query = query.names || query
  return names.map(createNameTest(query))
}

export function testName(name: any, query: any): boolean {
  name = isStr(name) ? name : nameOf(name)
  const nameTest = createNameTest(query.name || query)
  return nameTest(name)
}

