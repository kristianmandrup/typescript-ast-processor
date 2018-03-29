// BinaryExpression with EqualsToken as operatorToken is an assignment :)
import * as ts from 'typescript'
import { BaseNodeTester } from '../../base';
import {
  IndentifierNodeTester,
  createIndentifierNodeTester
} from '../../identifier';
import {
  BinaryExprTester
} from '../../../details'

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

  constructor(node: any, options: any) {
    super(node, options)
    this.identifierTester = createIndentifierNodeTester(node.left, this.options)
  }

  /**
   * Get name of identifier being assigned to
   */
  get name() {
    return this.identifierTester.name
  }

  info() {
    return {
      name: this.name,
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
