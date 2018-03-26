import * as ts from 'typescript'
import { BaseTester } from '../base'
import {
  arrayTestMethod
} from '../util'

export interface IItemTester {
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
    const nodes = this.node[key]
    if (items) {
      this.nodes = items
    } else if (key) {
      this.key = key
      this.nodes = this.node[key]
    }
    if (!nodes) {
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

  // TODO: fix it! use arrayTestMethod to find iterator
  test(query: any) {
    const result = arrayTestMethod(query)
    if (!result) return true
    const queryExpr = query[result.keyName]
    if (!queryExpr) return false
    const queryExprIterator = queryExpr[result.method]
    return queryExprIterator((queryExpr: any) => this.testItem(queryExpr))
  }

  testItem(queryExpr: any) {
    return this.itemTester ? this.itemTester.test(queryExpr) : this.tester(queryExpr)
  }
}
