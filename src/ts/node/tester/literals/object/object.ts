import { BaseNodeTester, INodeTester } from '../../base';

/**
 * Factory to create a VariableDeclaration tester
 * @param node
 * @param options
 */
export function createObjectLiteralTester(node: any, options: any) {
  return new ObjectLiteralTester(node, options)
}

/**
 * Contains:
 * - properties PropertyAssignment[]
 * each PropertyAssignment can contain
 *  - name (Identifier)
 *  - initializer - which can be an ObjectLiteral itself!
 */
export class ObjectLiteralTester extends BaseNodeTester {
  propertiesNodeTester: INodeTester

  constructor(node: any, options: any) {
    super(node, options)
    this.propertiesNodeTester = this.createNodeTester('properties', node.properties, this.options)
  }

  /**
   *  * TODO: Call the relevant VariableDeclaration tester that matches the particular type of VariableDeclaration (if available)
   * @param query
   */
  test(query: any): any {
    return this.propertiesNodeTester.test(query.id)
  }
}
