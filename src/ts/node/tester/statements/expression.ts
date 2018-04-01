import { BaseNodeTester } from "../base";
import { IDetailsTester } from "../../details/base";

/**
 * Factory to create a statement tester
 * @param node
 * @param options
 */
export function createExpressionStatementNodeTester(node: any, options: any) {
  return new ExpressionStatementNodeTester(node, options)
}

/**
 * Test binary expressin of the form [leftSide, operatorToken, rightSide]
 * Also check use of parenthesis for dev score
 */
export class ExpressionStatementNodeTester extends BaseNodeTester {
  exprTester: IDetailsTester

  /**
   * Create a Binary Expression Node Tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(node, options)
    this.exprTester = this.createExpressionTester(options)
  }

  // TODO: avoid duplication!!!
  protected createExpressionTester(node: any, options: any = {}) {
    return this.createDetailsTester('expression', node, options)
  }

  protected createExprTester(token: string = 'typeof', options: any = {}) {
    return (node: any) => {
      const exprTester = this.createExpressionTester(node, options)
      return exprTester.is(token, node)
    }
  }

  /**
   * Count occurremces of token
   * @param token
   */
  protected countOccurrenceOf(token: string): number {
    return this.countOccurrence({
      tester: this.createExprTester(token)
    })
  }

  get typeofCount() {
    return this.countOccurrenceOf('typeOf')
  }

  get deleteCount() {
    return this.countOccurrenceOf('delete')
  }

  get notCount() {
    return this.countOccurrenceOf('not')
  }

  info() {
    return {
      occurences: {
        typeof: this.typeofCount,
        delete: this.deleteCount,
        not: this.notCount
      }
    }
  }
}
