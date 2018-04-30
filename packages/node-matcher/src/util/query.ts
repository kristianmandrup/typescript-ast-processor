import {
  resolveArrayIteratorFindMethod,
  testName
} from './test'
import {
  toList,
} from '../../../util'


/**
 * Default function to format query item result
 * @param result
 */
function _formatQueryItemResult(result: any) {
  return result
}

/**
 * Query a node using a query and tester function
 * TODO: refactor/partition into smaller parts!
 * @param node
 * @param query
 * @param tester
 */
export function queryNode(node: any, query: any, options: any = {}) {
  let {
    tester,
    formatQueryItemResult
  } = options
  // use testName function as tester by default
  tester = tester || testName
  formatQueryItemResult = formatQueryItemResult || _formatQueryItemResult

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
    const match = tester(node, name)
    return match ?
      formatQueryItemResult({
        node,
        name,
        match
      }) : false
  })
}
