import { BaseNodeTester, INodeTester } from '../../base'

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
  properties: any[] = []

  constructor(node: any, options: any) {
    super(node, options)
    this.init(node)
  }

  /**
   * Initialize
   * @param node
   */
  init(node: any) {
    super.init(node)
    const properties = node.properties || []
    this.properties = properties
    if (this.hasProperties) {
      this.setTester({
        factory: 'object.properties',
        name: 'properties',
        node: properties,
      })
    }
  }

  /**
   * Whether object has any properties
   */
  get hasProperties() {
    return this.propertyCount > 0
  }

  /**
   * Number of object properties
   */
  get propertyCount() {
    return this.properties.length
  }

  /**
   * Retrieve registered properties node tester
   */
  get propertiesNodeTester(): any {
    return this.getTester({
      name: 'properties',
    }).info()
  }

  /**
   * Info for all properties
   */
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
    return this.runTest({
      query,
      qprop: 'properties',
      name: 'properties',
    })
  }

  /**
   * object info
   */
  info() {
    return {
      properties: this.propertiesInfo,
    }
  }
}
