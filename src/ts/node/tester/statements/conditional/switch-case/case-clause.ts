import * as ts from 'typescript'
import { BaseNodeTester } from '../../../base';


export function isCaseClause(node: any) {
  return ts.isCaseClause(node)
}

export function createCaseClauseTester(node: any, options: any = {}): CaseClauseTester {
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
   * Find key used to trigger clause
   */
  get key() {
    return ts.isLiteralExpression(this.expression) ? this.expression.getText() : 'unknown'
  }

  /**
   * Get info of case clause
   * - key: condition used to trigger clause
   */
  info() {
    return {
      key: this.key,
      breakCount: this.breakCount
    }
  }
}
