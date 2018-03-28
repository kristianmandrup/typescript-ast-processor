import * as ts from 'typescript'
import { BaseTester } from '../../base';
import { IndentifierNodeTester, createIndentifierNodeTester } from '../../identifier';

/**
 * Factory to create a VariableDeclaration tester
 * @param node
 * @param options
 */
export function createPropertyTester(node: any, options: any) {
  return new PropertyTester(node, options)
}

export class PropertyTester extends BaseTester {
  identifierTester: IndentifierNodeTester
  properties: ts.PropertyAssignment[]

  constructor(node: any, options: any) {
    super(node, options)
    this.identifierTester = createIndentifierNodeTester(node.name, this.options)
  }



  /**
   *  * TODO: Call the relevant VariableDeclaration tester that matches the particular type of VariableDeclaration (if available)
   * @param query
   */
  test(query: any): any {
    return this.identifierTester.test(query.id)
  }
}
