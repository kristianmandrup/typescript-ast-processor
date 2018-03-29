import * as ts from 'typescript'
import { BaseNodeTester } from '../../base';
import { IndentifierNodeTester, createIndentifierNodeTester } from '../../identifier';

/**
 * Factory to create a VariableDeclaration tester
 * @param node
 * @param options
 */
export function createPropertyAssignmentTester(node: any, options: any) {
  return new PropertyAssignmentTester(node, options)
}

export class PropertyAssignmentTester extends BaseNodeTester {
  identifierTester: IndentifierNodeTester

  constructor(node: any, options: any) {
    super(node, options)
    this.identifierTester = createIndentifierNodeTester(node.name, this.options)
  }

  get name() {
    return this.identifierTester.name
  }

  /**
   *  * TODO: Call the relevant VariableDeclaration tester that matches the particular type of VariableDeclaration (if available)
   * @param query
   */
  test(query: any): any {
    return this.identifierTester.test(query.id)
  }
}
