import {
  resolveArrayIteratorFindMethod,
  testName
} from './test'
import {
  toList,
} from '../../../util'


function queryNodeItemResult(obj: any) {
  return obj
}

export function queryNode(node: any, query: any, tester?: Function) {
  // use testName function as tester by default
  const testFun = tester || testName

  // find the key to use for querying node and the Array iterator method to use
  const queryDetails = resolveArrayIteratorFindMethod(query)
  if (!queryDetails) return false
  const {
    iteratorMethod,
    queryKey
  } = queryDetails

  const queryPart = query[queryKey] || query.named
  if (!queryPart) return false
  const queryList = toList(queryPart)

  return queryList[iteratorMethod]((name: string) => {
    const match = testFun(node, name)
    return match ?
      queryNodeItemResult({
        node,
        name,
        match
      }) : false
  })
}
