import { BaseNodeTester } from '../../base';
import { createPropertiesTester, PropertiesTester } from './properties';

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
  propertiesTester: PropertiesTester

  constructor(node: any, options: any) {
    super(node, options)
    this.propertiesTester = createPropertiesTester(node.properties, this.options)
  }

  /**
   *  * TODO: Call the relevant VariableDeclaration tester that matches the particular type of VariableDeclaration (if available)
   * @param query
   */
  test(query: any): any {
    return this.propertiesTester.test(query.id)
  }
}
