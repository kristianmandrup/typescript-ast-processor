import * as ts from 'typescript'
import { BlockStatementTester } from '../block';

export function createIfThenElseTester(node: any, options: any = {}): TernaryNodeTester {
  return new TernaryNodeTester(node, options)
}

export class TernaryNodeTester extends BlockStatementTester {
  thenStatement: ts.Block
  elseStatement: ts.Block

  /**
   * Create If Then Else Tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(node, options)
    // this.thenStatement = node.thenStatement
    // this.elseStatement = node.elseStatement
  }

  /**
   * Get basic info including else on/off and nested levels
   */
  info() {
    return {
      ...super.info(),
      conditionalType: 'ternary'
    }
  }

  /**
   * Query whether on else block on/off and nesting levels
   */
  test(query: any) {
    return true
  }
}
