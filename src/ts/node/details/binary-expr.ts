import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export function createBinaryExprTester(options: any) {
  return new BinaryExprTester(options)
}

export class BinaryExprTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.modifierKey = 'operatorToken'
  }

  get syntaxMap() {
    return {
      assignment: ts.SyntaxKind.EqualsToken,
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
      binOr: ts.SyntaxKind.BarToken,
      binAnd: ts.SyntaxKind.AmpersandToken,
    }
  }

  /**
   * Test if node is an assignment with eq token = between left and right side
   * @param node node to test
   */
  assignment(node?: any) {
    return this.has('assignment', { node })
  }

  /**
   * Test if node is a comparison with < token between left and right side
   * @param node node to test
   */
  lt(node?: any) {
    return this.has('lt', { node })
  }

  /**
   * Test if node is a comparison with <= token between left and right side
   * @param node node to test
   */
  lte(node?: any) {
    return this.has('lte', { node })
  }

  /**
   * Test if node is a comparison with > token between left and right side
   * @param node node to test
   */
  gt(node?: any) {
    return this.has('gt', { node })
  }

  /**
   * Test if node is a comparison with >= token between left and right side
   * @param node node to test
   */
  gte(node?: any) {
    return this.has('gte', { node })
  }

  /**
   * Test if node is a comparison with == token between left and right side
   * @param node node to test
   */
  eq(node?: any) {
    return this.has('eq', { node })
  }

  /**
   * Test if node is a comparison with !== token between left and right side
   * @param node node to test
   */
  notEq(node?: any) {
    return this.has('notEq', { node })
  }

  /**
   * Test if node is a comparison with === token between left and right side
   * @param node node to test
   */
  same(node?: any) {
    return this.has('same', { node })
  }

  /**
   * Test if node is a comparison with !=== token between left and right side
   * @param node node to test
   */
  notSame(node?: any) {
    return this.has('notSame', { node })
  }
}
