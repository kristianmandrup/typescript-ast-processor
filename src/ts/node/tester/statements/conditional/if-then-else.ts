import * as ts from 'typescript'
import { BlockStatementTester } from '../block-statement';

export class IfThenElseTester extends BlockStatementTester {
  thenStatement: ts.Block
  elseStatement: ts.Block

  /**
   * Create If Then Else Tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(node, options)
    this.thenStatement = node.thenStatement
    this.elseStatement = node.elseStatement
  }

  /**
   * Determine if conditional has an else Block
   */
  get hasElse() {
    return Boolean(this.elseStatement)
  }

  /**
   * Get basic info including else on/off and nested levels
   */
  info() {
    return {
      ...super.info(),
      else: this.hasElse
    }
  }

  /**
   * Query whether on else block on/off and nesting levels
   */
  test(query: any) {
    return this.testElse(query.else) && super.test(query.nested)
  }

  /**
   * Query whether on else block on/off
   */
  testElse(query: any) {
    if (!query) return true
    return Boolean(query.else) === this.hasElse
  }
}
