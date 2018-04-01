import * as ts from 'typescript'
import { createPropertyAssignmentTester } from './property-assignment';
import { BaseNodeTester } from '../../base';

/**
 * Factory to create a statement tester
 * @param node
 * @param options
 */
export function createPropertyNodesTester(node: any, options: any) {
  return new PropertyNodesTester(node, options)
}

export class PropertyNodesTester extends BaseNodeTester {
  properties: ts.PropertyAssignment[]
  propertiesTester: any // TODO

  constructor(properties: any, options: any) {
    super(properties, options)
    this.properties = properties
    this.propertiesTester = this.createNodeTester('list', this.properties, this.options)
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
