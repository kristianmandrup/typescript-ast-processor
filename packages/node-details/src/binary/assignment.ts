import * as ts from 'typescript'
import { BaseDetailsTester } from '../base'

export function createBinaryAssignmentTester(options: any) {
  return new BinaryAssignmentTester(options)
}

export interface IBinaryAssignmentTester {
  anyAssignment(node?: any): boolean
}

export class BinaryAssignmentTester extends BaseDetailsTester {
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
   * types of assignments
   */
  get map() {
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

  /**
   * Test if node is any type of assignment
   * @param node node to test
   */
  anyAssignment(node?: any): boolean {
    return this._anyMatch(node, this.map)
  }

  /**
   * Test if node is an assignment with eq token = between left and right side
   * @param node node to test
   */
  assignment(node?: any): boolean {
    return this.has('assign', { node })
  }

  /**
   * Test if node is an assignment with **= between left and right side
   * @param node node to test
   */
  powerAssignment(node?: any): boolean {
    return this.has('powerAssignment', { node })
  }

  /**
   * Test if node is an assignment with *= between left and right side
   * @param node node to test
   */
  multiplyAssignment(node?: any): boolean {
    return this.has('multiplyAssignment', { node })
  }

  /**
   * Test if node is an assignment with += between left and right side
   * @param node node to test
   */
  plusAssignment(node?: any): boolean {
    return this.has('plusAssignment', { node })
  }

  /**
   * Test if node is an assignment with += between left and right side
   * @param node node to test
   */
  minusAssignment(node?: any): boolean {
    return this.has('minusAssignment', { node })
  }

  /**
   * Test if node is an assignment with += between left and right side
   * @param node node to test
   */
  divideAssignment(node?: any): boolean {
    return this.has('divideAssignment', { node })
  }

  /**
   * Test if node is an assignment with += between left and right side
   * @param node node to test
   */
  percentAssignment(node?: any): boolean {
    return this.has('percentAssignment', { node })
  }
}
