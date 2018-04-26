import { BaseNodeTester } from '../base'
import { resolveArrayIteratorFindMethod } from '../util'
import { isFunction } from 'util'

export interface IItemTester {
  nodeQuery(node: any, query: any): any
  forNode(node: any): IItemTester
  test(item: any): boolean
  testNode(node: any, queryDetails: any): boolean
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
    this.itemNodeQueryFn = this.itemTester || this.tester
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
   * Turns query of the form: { anyOf: 'x', allOf: [ 'y', /z/ ] } }
   * Into: [{
   *   key: 'anyOf',
   *   matchExprs: 'x',
   * }, {
   *   key: 'anyOf',
   *   matchExprs: ['y', /z/],
   * }]
   * @param node
   * @param queryDetails
   */
  resolveIteratorFn(node: any, queryDetails: any): any[] {
    const { queryExpr } = queryDetails
    const queryList = Object.keys(queryExpr).map((key) => {
      const matchExprs = queryExpr[key]
      return {
        key,
        matchExprs,
      }
    })
    return queryList
  }

  /**
   * Test a single node using query details
   * @param node
   * @param queryDetails
   */
  testNode(node: any, queryDetails: any): boolean {
    const { queryExpr, iteratorMethod } = queryDetails
    const iteratorFn = this.resolveIteratorFn(node, queryDetails)
    if (!isFunction(iteratorFn)) {
      this.error('test: iteratorFn must be a function', {
        iteratorFn,
        queryExpr,
        iteratorMethod,
      })
    }
    return iteratorFn[iteratorMethod]((itemQueryExpr: any) => {
      return this.testItem(node, itemQueryExpr)
    })
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

  /**
   * Test a single item of the list using an itemTester or custom tester function
   *
   * Query of the form:
   * {
   *   key: 'anyOf',
   *   matchExprs: ['y', /z/],
   * }
   * @param node the item node to test
   * @param queryExpr the query to execute on item node
   */
  testItem(node: any, itemQueryExpr: any) {
    return this.itemNodeQueryFn(node, itemQueryExpr)
  }
}
