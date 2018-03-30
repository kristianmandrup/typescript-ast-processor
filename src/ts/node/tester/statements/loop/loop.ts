import { BlockStatementTester } from '../block';

/**
 * Factory to create a For loop tester
 * @param node
 * @param options
 */
export function createLoopNodeTester(node: any, options: any = {}): LoopNodeTester {
  return new LoopNodeTester(node, options)
}

/**
 * For loop query tester and data aggregator
 */

export class LoopNodeTester extends BlockStatementTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  protected createExpressionTester(options: any = {}) {
    return this.factories.details.createTester('expression', { ...options, node: this.node })
  }

  protected createExprTester(token: string = 'break', options: any = {}) {
    return (node: any) => {
      const exprTester = this.createExpressionTester({ ...options, node })
      return exprTester.is(token, node)
    }
  }

  protected countOccurenceOf(token: string, options: any = {}): number {
    return this.countOccurrence({
      tester: this.createExprTester(token, {
        ...options,
        exclude: ['switch', 'loop'] // exclude any nested switch or loop
      })
    })
  }

  /**
   * Count number of break statements within
   * TODO: also exlude any nested for/while loops
   */
  get breakCount() {
    return this.countOccurenceOf('break')
  }

  /**
   * Count number of continue statements within
   */
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
