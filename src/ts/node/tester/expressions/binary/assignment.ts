// BinaryExpression with EqualsToken as operatorToken is an assignment :)
import * as ts from 'typescript'
import { BaseNodeTester } from '../../base';
import {
  IndentifierNodeTester,
  createIndentifierNodeTester
} from '../../identifier';
import {
  createBinaryExprTester,
  BinaryExprTester
} from '../../../details/binary-expr';
import {
  testName
} from '../../util'

/**
 * Factory to create a VariableDeclaration tester
 * @param node
 * @param options
 */
export function createAssignmentTester(node: any, options: any) {
  const binaryTester = new BinaryExprTester({ ...options, node })
  if (binaryTester.assignment(node)) return
  return new AssignmentTester(node, options)
}

export class AssignmentTester extends BaseNodeTester {
  identifierTester: IndentifierNodeTester
  binaryExprTester: BinaryExprTester

  constructor(node: any, options: any) {
    super(node, options)
    this.identifierTester = createIndentifierNodeTester(node.left, this.options)
    this.binaryExprTester = createBinaryExprTester({ ...options, node })
  }

  /**
   * Get name of identifier being assigned to
   */
  get name() {
    return this.identifierTester.name
  }

  get assignmentType(): string {
    return this.binaryExprTester.anyAssignment(this.node) || 'unknown'
  }

  info() {
    return {
      name: this.name,
      assignmentType: this.assignmentType,
      value: null // TODO
    }
  }

  /**
   *
   * @param query
   */
  testDetails(query: any): any {
    return {
      name: this.identifierTester.test(query.name)
    }
  }

  /**
   * Test identifier being assigned to
   * @param query
   */
  test(query: any): any {
    return this.testName(query.name)
  }

  testAssignmentType(query: any) {
    return testName(this.assignmentType, query)
  }

  testName(query: any) {
    return this.identifierTester.test(query.name)
  }

  /**
   * Test type and/or id of particular typical values assigned, such as:
   * - class
   * - function
   * - other identifier
   * - undefined
   * - null
   * @param query
   */
  testValue(query: any) {
    return true
  }
}
