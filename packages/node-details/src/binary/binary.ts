import * as ts from 'typescript'
import { BaseDetailsTester } from '../base'
import { createBinaryAssignmentTester } from './assignment'
import { createBinaryComparisonTester } from './comparison'

export function createBinaryExprTester(options: any) {
  return new BinaryExprTester(options)
}

export interface IBinaryExprTester {
  anyAssignment(node?: any): boolean
  anyComparison(node?: any): boolean
  anyBinary(node?: any): boolean
  applyPlus(node?: any): boolean
  applyMinus(node?: any): boolean
}

export class BinaryExprTester extends BaseDetailsTester {
  assignment: any
  comparison: any

  /**
   * Create binary expression details tester
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
    this.modifierKey = 'operatorToken'
    this.assignment = createBinaryAssignmentTester(options)
    this.comparison = createBinaryComparisonTester(options)
  }

  /**
   * binary logic tolens
   */
  get binaryLogic() {
    return {
      binaryOr: ts.SyntaxKind.BarToken,
      binaryAnd: ts.SyntaxKind.AmpersandToken,
    }
  }

  /**
   * special binary tokens
   */
  get special() {
    return {
      instanceOf: ts.SyntaxKind.InstanceOfKeyword,
    }
  }

  /**
   * math application tokens
   */
  get applyCalc() {
    return {
      applyPlus: ts.SyntaxKind.PlusPlusToken,
      applyMinus: ts.SyntaxKind.MinusMinusToken,
      applyPower: ts.SyntaxKind.AsteriskAsteriskToken,
    }
  }

  /**
   * full syntax map
   */
  get syntaxMap() {
    return {
      ...this.assignment.map,
      ...this.applyCalc,
      ...this.comparison.map,
      ...this.binaryLogic,
      ...this.special,
    }
  }

  /**
   * Test if node is any type of assignment
   * @param node node to test
   */
  anyComparison(node?: any): boolean {
    return this._anyMatch(node, this.comparison.map)
  }

  /**
   * Test if node is any type of assignment
   * @param node node to test
   */
  anyBinary(node?: any): boolean {
    return this._anyMatch(node, this.binaryLogic)
  }

  /**
   * Test if node is uses ++ token between left and right side
   * @param node node to test
   */
  applyPlus(node?: any): boolean {
    return this.has('applyPlus', { node })
  }

  /**
   * Test if node is uses -- token between left and right side
   * @param node node to test
   */
  applyMinus(node?: any): boolean {
    return this.has('applyMinus', { node })
  }

  /**
   * Test if node is uses ** token between left and right side
   * @param node node to test
   */
  applyPower(node?: any): boolean {
    return this.has('applyPower', { node })
  }
}
