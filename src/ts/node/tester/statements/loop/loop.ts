import { BlockStatementNodeTester } from '../block'

/**
 * Factory to create a For loop tester
 * @param node
 * @param options
 */
export function createLoopNodeTester(
  node: any,
  options: any = {},
): LoopNodeTester {
  return new LoopNodeTester(node, options)
}

/**
 * For loop query tester and data aggregator
 */

export class LoopNodeTester extends BlockStatementNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Create expression details node tester (duplicate)
   * @param node
   * @param options
   */
  protected createExpressionTester(node: any, options: any = {}) {
    return this.createDetailsTester('expression', node, options)
  }

  /**
   * FIX: duplicate
   * @param token
   * @param options
   */
  protected createExprTester(token: string = 'break', options: any = {}) {
    return (node: any) => {
      const exprTester = this.createExpressionTester(node, options)
      return exprTester.is(token, node)
    }
  }

  /**
   * Count occurences of token (duplicate)
   * @param token
   * @param options
   */
  protected countOccurenceOf(token: string, options: any = {}): number {
    return this.countOccurrence({
      tester: this.createExprTester(token, {
        ...options,
        exclude: ['switch', 'loop'], // exclude any nested switch or loop
      }),
    })
  }

  /**
   * Count number of break statements within
   * TODO: also exlude any nested for/while loops
   */
  get breakCount(): number {
    return this.countOccurenceOf('break')
  }

  /**
   * Count number of continue statements within
   */
  get continueCount(): number {
    return this.countOccurenceOf('continue')
  }

  /**
   * Get generic loop info
   */
  info(): any {
    return {
      ...super.info(),
      loop: true,
      // breakCount: this.breakCount,
      // continueCount: this.continueCount
    }
  }
}
