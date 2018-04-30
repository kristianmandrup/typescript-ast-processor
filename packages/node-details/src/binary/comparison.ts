import * as ts from 'typescript'
import { BaseDetailsTester } from '../base'

export function createBinaryComparisonTester(options: any) {
  return new BinaryComparisonTester(options)
}

export interface IBinaryAssignmentTester {
  anyAssignment(node?: any): boolean
}

export class BinaryComparisonTester extends BaseDetailsTester {
  /**
   * Create binary expression details tester
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
    this.modifierKey = 'operatorToken'
  }

  /**
   * Types of binary comparisons
   */
  get map() {
    return {
      lt: ts.SyntaxKind.LessThanToken,
      lte: ts.SyntaxKind.LessThanEqualsToken,
      gt: ts.SyntaxKind.GreaterThanToken,
      gte: ts.SyntaxKind.GreaterThanEqualsToken,
      eq: ts.SyntaxKind.EqualsEqualsToken,
      notEq: ts.SyntaxKind.EqualsEqualsToken,
      same: ts.SyntaxKind.EqualsEqualsToken,
      notSame: ts.SyntaxKind.ExclamationEqualsToken,
      or: ts.SyntaxKind.BarBarToken,
      and: ts.SyntaxKind.AmpersandAmpersandToken,
    }
  }

  /**
   * Test if node is a comparison with < token between left and right side
   * @param node node to test
   */
  lt(node?: any): boolean {
    return this.has('lt', { node })
  }

  /**
   * Test if node is a comparison with <= token between left and right side
   * @param node node to test
   */
  lte(node?: any): boolean {
    return this.has('lte', { node })
  }

  /**
   * Test if node is a comparison with > token between left and right side
   * @param node node to test
   */
  gt(node?: any): boolean {
    return this.has('gt', { node })
  }

  /**
   * Test if node is a comparison with >= token between left and right side
   * @param node node to test
   */
  gte(node?: any): boolean {
    return this.has('gte', { node })
  }

  /**
   * Test if node is a comparison with == token between left and right side
   * @param node node to test
   */
  eq(node?: any): boolean {
    return this.has('eq', { node })
  }

  /**
   * Test if node is a comparison with !== token between left and right side
   * @param node node to test
   */
  notEq(node?: any): boolean {
    return this.has('notEq', { node })
  }

  /**
   * Test if node is a comparison with === token between left and right side
   * @param node node to test
   */
  same(node?: any): boolean {
    return this.has('same', { node })
  }

  /**
   * Test if node is a comparison with !=== token between left and right side
   * @param node node to test
   */
  notSame(node?: any): boolean {
    return this.has('notSame', { node })
  }

  /**
   * Test if node is a comparison with !=== token between left and right side
   * @param node node to test
   */
  and(node?: any): boolean {
    return this.has('and', { node })
  }

  /**
   * Test if node is a comparison with !=== token between left and right side
   * @param node node to test
   */
  or(node?: any): boolean {
    return this.has('or', { node })
  }
}
