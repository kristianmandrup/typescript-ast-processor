import * as ts from 'typescript'
import { BaseNodeTester } from '../base'

/**
 * Factory to create a VariableDeclaration tester
 * @param node
 * @param options
 */
export function createArrayLiteralTester(node: any, options: any) {
  return new ArrayLiteralTester(node, options)
}

/**
 * Contains:
 * - properties ItemAssignment[]
 * each ItemAssignment can contain
 *  - name (Identifier)
 *  - initializer - which can be an ArrayLiteral itself!
 */
export class ArrayLiteralTester extends BaseNodeTester {
  items: any[]

  constructor(node: any, options: any) {
    super(node, options)
    this.init(node)
  }

  /**
   * Initialize
   * @param node
   */
  init(node: any) {
    super.init(node)
    const items = node.elements || []
    this.items = items
    if (this.hasItems) {
      this.setTester({
        name: 'list',
        node: items,
      })
      this.setTester({
        name: 'literal',
        node,
      })
    }
  }

  /**
   * if array has any items
   */
  get hasItems() {
    return this.itemsCount > 0
  }

  /**
   * number of items in array
   */
  get itemsCount() {
    return this.items.length
  }

  /**
   * Basic info on array
   * TODO: would be nice to add types info on items:
   * - literals
   * - id refs
   * - functions
   * - other
   */
  info() {
    return {
      count: this.itemsCount,
    }
  }

  /**
   * Example:
   * {
   *   count: {
   *     min: 2
   *     max: 5
   *   }
   * }
   * @param query
   */
  test(query: any) {
    query = query.count || query
    return this.testCount(query, this.itemsCount) // &&
    // this.testItems(query) &&
    // this.testReduceItems(query)
  }

  /**
   * Query items as a whole
   * @param query
   */
  testItems(query: any) {
    return this.runTest({
      query,
      name: 'list',
      qprop: 'properties',
    })
  }

  /**
   * Query each item individually for a detailed query result
   * Note: Currently only works on literals
   * @param query
   */
  testReduceItems(query: any) {
    return this.items.reduce((acc: any, item: any) => {
      const test = this.testItem(item, query)
      if (test) {
        acc[test.name] = test.result
      }
      return acc
    }, {})
  }

  /**
   * Test a single item
   * @param item
   * @param query
   */
  testItem(item: any, query: any) {
    const itemTester = this.createItemTester(item)
    if (!itemTester) return
    return {
      result: itemTester.test(query.item),
      name: itemTester.name,
    }
  }

  /**
   * Create tester for single Item Assignment node
   * @param propNode
   */
  createItemTester(itemNode: any) {
    if (!ts.isLiteralExpression(itemNode)) return
    return this.createLiteralTester(itemNode)
  }

  /**
   * Create literal node tester
   * @param node
   */
  createLiteralTester(node: any) {
    return this.getTester({
      name: 'literal',
      node,
    })
  }
}
