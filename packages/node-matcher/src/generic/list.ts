import { BaseNodeTester } from '../base'
import { resolveArrayIteratorFindMethod } from '../util'

import { IItemTester, createSingleNodeTester } from './item'

/**
 * Factory to create a VariableDeclaration tester
 * @param node
 * @param options
 */
export function createNodeListTester(node: any, options: any) {
  return new NodeListTester(node, options)
}

export class NodeListTester extends BaseNodeTester {
  itemTester: IItemTester
  tester: Function
  key: string
  nodes: any[]

  constructor(node: any, options: any) {
    super(node, options)
  }

  init(node: any) {
    super.init(node)
    const { options } = this
    const key = options.key
    const items = Array.isArray(node) ? node : options.items
    if (items) {
      this.nodes = items
    } else if (key) {
      this.key = key
      this.nodes = this.node[key]
    }
    if (!this.nodes) {
      this.error(`init: No nodes to iterate`, {
        options,
        node,
        nodes: this.nodes,
      })
    }
    this.itemTester = options.itemTester
  }

  /**
   *
   * @param query
   */
  iteratorDetails(query: any): any {
    const resolved = resolveArrayIteratorFindMethod(query)
    if (!resolved) return true
    const { queryKey, iteratorMethod } = resolved
    const queryExpr = query[queryKey]
    this.log('iteratorDetails', {
      resolved,
      queryKey,
      queryExpr,
    })
    return {
      queryExpr,
      iteratorMethod,
    }
  }

  /**
   * Test a single node using query details
   * @param node
   * @param queryDetails
   */
  testNode(node: any, queryDetails: any): boolean {
    const nodeTester = createSingleNodeTester(this, node, this.options)
    return nodeTester.test(queryDetails)
  }

  /**
   * Query list using query
   * @param query
   */
  test(query: any): any {
    const queryDetails = this.iteratorDetails(query)
    if (!queryDetails.queryExpr) return false
    return this.nodes.map((node) => {
      return this.testNode(node, queryDetails)
    })
  }
}
