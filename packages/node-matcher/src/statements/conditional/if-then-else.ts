import * as ts from 'typescript'
import { BlockStatementNodeTester } from '../block'

export function createIfThenElseTester(
  node: any,
  options: any = {},
): IfThenElseTester {
  return new IfThenElseTester(node, options)
}

export class IfThenElseTester extends BlockStatementNodeTester {
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
    return Boolean(this.elseStatement !== undefined)
  }

  /**
   * Get basic info including else on/off and nested levels
   */
  info() {
    return {
      ...super.info(),
      conditionalType: 'if',
      else: this.hasElse,
    }
  }

  /**
   * Query whether on else block on/off and nesting levels
   */
  test(query: any) {
    return super.test(query.nested) && this.testElse(query.else)
  }

  /**
   * Query whether on else block on/off
   */
  testElse(query: any) {
    if (!query) return true
    return Boolean(query.else) === this.hasElse
  }
}
