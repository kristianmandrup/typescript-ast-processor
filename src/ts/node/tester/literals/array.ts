import * as ts from 'typescript'
import { BaseNodeTester } from '../base';
import { NodesTester } from '../generic';

// TODO
function createLiteralTester(node: any, options: any) {
  return {
    test(query: any) {
      return true
    },
    name: 'unknown'
  }
}


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
  itemsTester: NodesTester

  constructor(node: any, options: any) {
    super(node, options)
    const items = node.elements || []
    this.items = items
    if (this.hasItems) {
      this.itemsTester = this.createNodeTester('list', items, options) as NodesTester
    }
  }

  /**
   * if array has any items
   */
  get hasItems() {
    return this.itemsCount > 0
  }

  /**
   * Create tester for single Item Assignment node
   * @param propNode
   */
  createItemTester(itemNode: any) {
    if (!ts.isLiteralExpression(itemNode)) return
    return createLiteralTester(itemNode, this.options)
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
      count: this.itemsCount
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
    this.itemsTester.test(query.properties)
  }

  /**
   * Query each item individually for a detailed query result
   * Note: Currently only works on literals
   * @param query
   */
  testReduceItems(query: any) {
    return this.items.reduce((acc: any, item: any) => {
      const itemTester = this.createItemTester(item)
      if (itemTester) {
        const name = itemTester.name
        acc[name] = itemTester.test(query.item)
      }
      return acc
    }, {})
  }
}
