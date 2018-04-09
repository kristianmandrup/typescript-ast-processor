import { BaseNodeTester, INodeTester } from '../../base';
import { IndentifierNodeTester, createIndentifierNodeTester } from '../../identifier';

/**
 * Factory to create a VariableDeclaration tester
 * @param node
 * @param options
 */
export function createPropertyAssignmentTester(node: any, options: any) {
  return new PropertyAssignmentNodeTester(node, options)
}

export class PropertyAssignmentNodeTester extends BaseNodeTester {
  identifierTester: IndentifierNodeTester // INodeTester // IndentifierNodeTester

  constructor(node: any, options: any) {
    super(node, options)
    this.identifierTester = this.createNodeTester('identifier', node.name, this.options) as IndentifierNodeTester
  }

  /**
   * id of identifier node
   */
  get name() {
    return this.identifierTester.name
  }

  /**
   * Node info
   */
  info() {
    return {
      name: this.name
    }
  }

  /**
   *  * TODO: Call the relevant VariableDeclaration tester that matches the particular type of VariableDeclaration (if available)
   * @param query
   */
  test(query: any): any {
    return this.identifierTester.test(query.id)
  }
}
