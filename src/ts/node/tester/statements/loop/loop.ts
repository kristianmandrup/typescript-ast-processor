import * as ts from 'typescript'
import { BlockStatementTester } from '../block';
import { createExpressionTester } from '../../../details/expression';

/**
 * Factory to create a For loop tester
 * @param node
 * @param options
 */
export function createLoopNodeTester(node: any, options: any = {}): LoopNodeTester {
  return new LoopNodeTester(node, options)
}

function createExprTester(token: string = 'typeof', options: any = {}) {
  return (node: any) => {
    const exprTester = createExpressionTester({ ...options, node })
    return exprTester.is(token, node)
  }
}

/**
 * For loop query tester and data aggregator
 */

export class LoopNodeTester extends BlockStatementTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  protected countOccurenceOf(token: string): number {
    return this.countOccurrence({
      tester: createExprTester(token)
    })
  }

  get breakCount() {
    return this.countOccurenceOf('break')
  }

  get continueCount() {
    return this.countOccurenceOf('continue')
  }

  /**
   * Get generic loop info
   */
  info() {
    return {
      ...super.info(),
      loop: true,
      breakCount: this.breakCount,
      continueCount: this.continueCount
    }
  }
}
