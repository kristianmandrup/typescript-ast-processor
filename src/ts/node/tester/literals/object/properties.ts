import * as ts from 'typescript'
import { createPropertyTester } from './property';
import { ListTester } from '../../generic';

/**
 * Factory to create a statement tester
 * @param node
 * @param options
 */
export function createPropertiesTester(node: any, options: any) {
  return new PropertiesTester(node, options)
}

export class PropertiesTester extends ListTester {
  properties: ts.PropertyAssignment[]

  constructor(properties: any, options: any) {
    super(properties, options)
    this.properties = properties
  }

  createPropertyTester(node: any, options: any) {
    return createPropertyTester(node, options)
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
    return this.testCount(query, this.propertiesCount)
  }

  testProperty(query: any) {
  }
}
