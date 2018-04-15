import * as ts from 'typescript'
import { BaseNodeTester } from '../../../base'

export function isCaseClause(node: any) {
  return ts.isCaseClause(node)
}

export function createCaseClauseTester(
  node: any,
  options: any = {},
): CaseClauseTester {
  // if (!isCaseClause(node)) return
  return new CaseClauseTester(node, options)
}

export class CaseClauseTester extends BaseNodeTester {
  expression: any
  expressionTester: any

  constructor(node: any, options: any) {
    super(node, options)
    this.expression = node.expression
  }

  /**
   * Create expression details node tester
   * @param node
   * @param options
   */
  protected createExpressionTester(node: any, options: any = {}) {
    return this.createDetailsTester('expression', node, options)
  }

  /**
   * Create a node tester using an expression tester
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
   * Count occurrences of token
   * TODO: generalize!?
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
  get breakCount() {
    return this.countOccurenceOf('break')
  }

  /**
   * Find key used to trigger clause
   */
  get key() {
    return ts.isLiteralExpression(this.expression)
      ? this.expression.getText()
      : 'unknown'
  }

  /**
   * Get info of case clause
   * - key: condition used to trigger clause
   */
  info() {
    return {
      key: this.key,
      breakCount: this.breakCount,
    }
  }
}
