import { BaseNodeTester } from '../base'
import { resolveArrayIteratorFindMethod } from '../util'

export interface IItemTester {
  nodeQuery(node: any, query: any): any
  forNode(node: any): IItemTester
  test(item: any): boolean
}

/**
 * Factory to create a VariableDeclaration tester
 * @param node
 * @param options
 */
export function createNodesTester(node: any, options: any) {
  return new NodesTester(node, options)
}

export class NodesTester extends BaseNodeTester {
  itemTester: IItemTester
  tester: Function
  key: string
  nodes: any[]
  itemNodeQueryFn: any // Function

  constructor(node: any, options: any) {
    super(node, options)
  }

  init() {
    super.init()
    const { options, node } = this
    const key = options.key
    const items = Array.isArray(node) ? node : options.items
    if (items) {
      this.nodes = items
    } else if (key) {
      this.key = key
      this.nodes = this.node[key]
    }
    if (!this.nodes) {
      this.error(`ListTester: No nodes to iterate`, {
        options,
        node,
      })
    }
    this.itemTester = options.itemTester
    this.itemNodeQueryFn = this.itemTester || this.tester
  }

  /**
   * Query list using query
   * @param query
   */
  test(query: any): any {
    const resolved = resolveArrayIteratorFindMethod(query)
    if (!resolved) return true
    const { queryKey, iteratorMethod } = resolved

    const queryExpr = query[queryKey]
    if (!queryExpr) return false

    return this.nodes.map((node) => {
      return queryExpr[iteratorMethod]((query: any) => {
        return this.testItem(node, query)
      })
    })
  }

  /**
   * Test a single item of the list using an itemTester or custom tester function
   * @param node the item node to test
   * @param queryExpr the query to execute on item node
   */
  testItem(node: any, query: any) {
    return this.itemNodeQueryFn(node, query)
  }
}
