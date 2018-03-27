import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class CallTester extends BaseDetailsTester {
  literal: any
  node: any

  constructor(options: any) {
    super(options)
  }

  get syntaxMap() {
    return {
      await: ts.SyntaxKind.AwaitExpression
    }
  }

  /**
   * Test if function call node is an await expression
   * @param node function call node to test
   */
  await(node?: any) {
    return this.has('await', { node })
  }
}
