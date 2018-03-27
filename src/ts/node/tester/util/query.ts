import {
  arrayTestMethod,
  testName
} from './test'
import {
  toList,
} from '../../../util'

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
