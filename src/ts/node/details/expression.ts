import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export function createExpressionTester(options: any) {
  return new ExpressionTester(options)
}

export class ExpressionTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get syntaxMap() {
    return {
      typeof: ts.SyntaxKind.TypeOfKeyword,
      not: ts.SyntaxKind.ExclamationToken,
      delete: ts.SyntaxKind.DeleteKeyword
    }
  }

  /**
   * Test if node is a comparison with !=== token between left and right side
   * @param node node to test
   */
  typeof(node?: any) {
    return this.has('typeof', { node })
  }

  /**
   * Test if node is a not expression ie !x
   * @param node node to test
   */
  not(node?: any) {
    return this.has('not', { node })
  }

  /**
   * Test if node is a delete expression
   * @param node node to test
   */
  delete(node?: any) {
    ts.isDeleteExpression(node)
    // return this.has('delete', { node })
  }
}
