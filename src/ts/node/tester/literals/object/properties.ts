import * as ts from 'typescript'
import { createPropertyAssignmentTester } from './property-assignment';
import { ListTester } from '../../generic';
import { BaseTester } from '../../base';

/**
 * Factory to create a statement tester
 * @param node
 * @param options
 */
export function createPropertiesTester(node: any, options: any) {
  return new PropertiesTester(node, options)
}

export class PropertiesTester extends BaseTester {
  properties: ts.PropertyAssignment[]
  propertiesTester: ListTester

  constructor(properties: any, options: any) {
    super(properties, options)
    this.properties = properties
    this.propertiesTester = new ListTester(this.properties, this.options)
  }

  /**
   * Create tester for single Property Assignment node
   * @param propNode
   */
  createPropertyAssignmentTester(propNode: any) {
    return createPropertyAssignmentTester(propNode, this.options)
  }

  get propertiesCount() {
    return this.properties.length
  }

  info() {
    return {
      count: this.propertiesCount
    }
  }

  /**
   * Example:
   * {
   *   count: {
   *     min: 2
   *     max: 5
   *   }
   * }
   * @param query
   */
  test(query: any) {
    query = query.count || query
    return this.testCount(query, this.propertiesCount) &&
      this.testProperties(query) &&
      this.testPropertyItems(query)
  }

  testProperties(query: any) {
    this.propertiesTester.test(query.properties)
  }

  testPropertyItems(query: any) {
    return this.properties.reduce((acc: any, prop: ts.PropertyAssignment) => {
      const propTester = this.createPropertyAssignmentTester(prop)
      const name = propTester.name
      acc[name] = propTester.test(query.property)
      return acc
    }, {})
  }
}
