import { BaseNodeTester } from '../../../base'
import { IndentifierNodeTester } from '../../../identifier'

/**
 * Factory to create a VariableDeclaration tester
 * @param node
 * @param options
 */
export function createPropertyAssignmentTester(node: any, options: any) {
  return new PropertyAssignmentNodeTester(node, options)
}

export class PropertyAssignmentNodeTester extends BaseNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
    this.init(node)
  }

  init(node: any) {
    this.setTester({
      name: 'identifier',
      node: node.name,
    })
  }

  /**
   * Retrieve registered properties node tester
   */
  get idNodeTester(): any {
    return this.getTester({
      name: 'identifier',
    })
  }

  /**
   * id of identifier node (property name assigned to)
   */
  get name() {
    return this.idNodeTester.name
  }

  /**
   * Node info
   */
  info() {
    return {
      name: this.name,
    }
  }

  /**
   * Test name/id of property assigned to
   * @param query
   */
  testName(query: any) {
    return this.runTest({
      query,
      qprop: 'name',
      name: 'identifier',
    })
  }

  /**
   *  * TODO: Call the relevant VariableDeclaration tester that matches the particular type of VariableDeclaration (if available)
   * @param query
   */
  test(query: any): any {
    return this.testName(query)
  }
}
