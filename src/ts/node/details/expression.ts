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
      typeOf: ts.SyntaxKind.TypeOfKeyword
    }
  }

  /**
   * Test if node is a comparison with !=== token between left and right side
   * @param node node to test
   */
  typeOf(node?: any) {
    return this.has('typeOf', { node })
  }
}
