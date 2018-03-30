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

  get assignments() {
    return {
      assignment: ts.SyntaxKind.EqualsToken,
      powerAssignment: ts.SyntaxKind.AsteriskAsteriskEqualsToken,
      multiplyAssignment: ts.SyntaxKind.AsteriskEqualsToken,
      plusAssignment: ts.SyntaxKind.PlusEqualsToken,
      minusAssignment: ts.SyntaxKind.MinusEqualsToken,
      divideAssignment: ts.SyntaxKind.SlashEqualsToken,
      percentAssignment: ts.SyntaxKind.PercentEqualsToken,
    }
  }

  get comparisons() {
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

  get binaryLogic() {
    return {
      binaryOr: ts.SyntaxKind.BarToken,
      binaryAnd: ts.SyntaxKind.AmpersandToken,
    }
  }

  get special() {
    return {
      instanceOf: ts.SyntaxKind.InstanceOfKeyword
    }
  }

  get applyCalc() {
    return {
      applyPlus: ts.SyntaxKind.PlusPlusToken,
      applyMinus: ts.SyntaxKind.MinusMinusToken,
      applyPower: ts.SyntaxKind.AsteriskAsteriskToken,
    }
  }

  get syntaxMap() {
    return {
      ...this.assignments,
      ...this.applyCalc,
      ...this.comparisons,
      ...this.binaryLogic,
      ...this.special
    }
  }

  /**
   * Test if node is any type of assignment
   * @param node node to test
   */
  anyAssignment(node?: any): string | undefined {
    const assignmentKeys = Object.keys(this.assignments)
    return this.matchesAny(assignmentKeys, { node })
  }

  /**
   * Test if node is any type of assignment
   * @param node node to test
   */
  anyComparison(node?: any): string | undefined {
    const comparisonKeys = Object.keys(this.comparisons)
    return this.matchesAny(comparisonKeys, { node })
  }

  /**
   * Test if node is any type of assignment
   * @param node node to test
   */
  anyBinary(node?: any): string | undefined {
    const binaryLogicKeys = Object.keys(this.binaryLogic)
    return this.matchesAny(binaryLogicKeys, { node })
  }

  /**
   * Test if node is uses ++ token between left and right side
   * @param node node to test
   */
  applyPlus(node?: any) {
    return this.has('applyPlus', { node })
  }

  /**
   * Test if node is uses -- token between left and right side
   * @param node node to test
   */
  applyMinus(node?: any) {
    return this.has('applyMinus', { node })
  }

  /**
   * Test if node is uses ** token between left and right side
   * @param node node to test
   */
  applyPower(node?: any) {
    return this.has('applyPower', { node })
  }


  /**
   * Test if node is an assignment with eq token = between left and right side
   * @param node node to test
   */
  assignment(node?: any) {
    return this.has('assign', { node })
  }

  /**
   * Test if node is an assignment with **= between left and right side
   * @param node node to test
   */
  powerAssignment(node?: any) {
    return this.has('powerAssignment', { node })
  }

  /**
   * Test if node is an assignment with *= between left and right side
   * @param node node to test
   */
  multiplyAssignment(node?: any) {
    return this.has('multiplyAssignment', { node })
  }

  /**
   * Test if node is an assignment with += between left and right side
   * @param node node to test
   */
  plusAssignment(node?: any) {
    return this.has('plusAssignment', { node })
  }

  /**
   * Test if node is an assignment with += between left and right side
   * @param node node to test
   */
  minusAssignment(node?: any) {
    return this.has('minusAssignment', { node })
  }

  /**
   * Test if node is an assignment with += between left and right side
   * @param node node to test
   */
  divideAssignment(node?: any) {
    return this.has('divideAssignment', { node })
  }

  /**
   * Test if node is an assignment with += between left and right side
   * @param node node to test
   */
  percentAssignment(node?: any) {
    return this.has('percentAssignment', { node })
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
