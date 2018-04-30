import * as ts from 'typescript'
import { testName } from '../../util'
import { LoopNodeTester } from './loop'

/**
 * Factory to create a For loop tester
 * @param node
 * @param options
 */
export function createForLoopTester(
  node: any,
  options: any = {},
): ForLoopNodeTester {
  return new ForLoopNodeTester(node, options)
}

/**
 * For loop query tester and data aggregator
 */

export class ForLoopNodeTester extends LoopNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Determine if the node is a simple ("old school" C style) for statement
   */
  get isFor() {
    return ts.isForStatement(this.node)
  }

  /**
   * Determine if the node is a for x of y statement
   */
  get isForOf() {
    return ts.isForOfStatement(this.node)
  }

  /**
   * Determine if the node is a for x in y statement
   */
  get isForIn() {
    return ts.isForInStatement(this.node)
  }

  /**
   * Determine and return the for for loop type ('for', 'of' or 'in')
   */
  get forType(): string {
    if (this.isFor) return 'for'
    if (this.isForIn) return 'in'
    if (this.isForOf) return 'of'
    this.error('forType: unknown type of for loop', {
      node: this.node,
    })
    return 'unknown'
  }

  info() {
    return {
      ...super.info(),
      loopType: 'for',
      for: this.isFor,
      forOf: this.isForOf,
      forIn: this.isForIn,
      forType: this.forType,
    }
  }

  /**
   * Query whether on else block on/off and nesting levels
   */
  test(query: any): boolean {
    return super.test(query) && this.testForType(query.type)
  }

  /**
   * Test if type of for loop matches query
   * @param query
   */
  testForType(query: any) {
    return testName(this.forType, query)
  }
}
