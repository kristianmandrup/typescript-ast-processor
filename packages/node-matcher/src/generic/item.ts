import { isArray } from 'util'
import { BaseNodeTester } from '../base'

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
export function createSingleNodeTester(tester: any, node: any, options: any) {
  return new SingleNodeTester(tester, node, options)
}

export class SingleNodeTester extends BaseNodeTester {
  tester: any

  constructor(tester: any, node: any, options: any) {
    super(node, options)
    this.tester = tester
  }

  init(node: any) {
    super.init(node)
  }

  get itemNodeQueryFn(): Function {
    return this.tester.itemTester || this.tester.tester
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
  resolveQueryExpList(node: any, queryDetails: any): any[] {
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
  test(queryDetails: any): boolean {
    const { node } = this
    const { queryExpr, iteratorMethod } = queryDetails
    const queryExpList = this.resolveQueryExpList(node, queryDetails)
    if (!isArray(queryExpList)) {
      this.error('test: queryExpList must be a list', {
        queryExpList,
        queryExpr,
        iteratorMethod,
      })
    }
    return queryExpList[iteratorMethod]((itemQueryExpr: any) => {
      return this.testItem(node, itemQueryExpr)
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
