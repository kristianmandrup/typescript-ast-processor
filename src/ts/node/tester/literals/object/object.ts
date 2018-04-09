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
  properties: any[] = []

  constructor(node: any, options: any) {
    super(node, options)
    const properties = node.properties || []
    this.properties = properties
    if (this.hasProperties) {
      this.propertiesNodeTester = this.createNodeTester('object.properties', properties, this.options)
    }
  }

  get hasProperties() {
    return this.propertyCount > 0
  }

  get propertyCount() {
    return this.properties.length
  }

  get propertiesInfo() {
    if (!this.hasProperties) return []
    return this.propertiesNodeTester.info()
  }

  /**
   *  * TODO: Call the relevant VariableDeclaration tester that matches the particular type of VariableDeclaration (if available)
   * @param query
   */
  test(query: any): any {
    if (!this.propertiesNodeTester) return false
    return this.propertiesNodeTester.test(query.properties)
  }

  info() {
    return {
      properties: this.propertiesInfo
    }
  }
}
