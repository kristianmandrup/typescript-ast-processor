import * as ts from 'typescript'
import { BaseTester } from '../base'
import {
  resolveArrayIteratorFindMethod
} from '../util'

export interface IItemTester {
  forNode(node: any): IItemTester
  test(item: any): boolean
}

export class ListTester extends BaseTester {
  itemTester: IItemTester
  tester: Function
  key: string
  nodes: any[]

  constructor(node: any, options: any) {
    super(node, options)
    const key = options.key
    const items = options.items
    if (items) {
      this.nodes = items
    } else if (key) {
      this.key = key
      this.nodes = this.node[key]
    }
    if (!this.nodes) {
      this.error(`ListTester: No nodes to iterate`, {
        options,
        node
      })
    }

    this.itemTester = options.itemTester
    this.tester = this.createTester()
  }

  createTester(): Function {
    return this.options.createTester ? this.options.createTester(this.nodes) : this.options.tester
  }

  /**
   * Query list using query
   * @param query
   */
  test(query: any) {
    const resolved = resolveArrayIteratorFindMethod(query)
    if (!resolved) return true
    const {
      queryKey,
      iteratorMethod
    } = resolved

    const queryExpr = query[queryKey]
    if (!queryExpr) return false

    this.nodes.map(node => {
      return queryExpr[iteratorMethod]((query: any) => {
        return this.testItem(node, query)
      })
    })
  }

  testItem(node: any, queryExpr: any) {
    return this.itemTester ? this.itemTester.forNode(node).test(queryExpr) : this.tester(node, queryExpr)
  }
}
