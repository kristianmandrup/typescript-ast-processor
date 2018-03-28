import * as ts from 'typescript'
import { BaseTester } from '../../base'
import {
  createParameterTester,
  ParameterTester,
  isParameter
} from './parameter';
import {
  idDetails,
  typeName,
  nameOf,
} from '../../util'
import {
  decoratorName
} from '../../util/name'

/**
 * Test if every node in the collection is a parameter node
 * @param nodes nodes to test
 * @param options extra options such as error handler
 */
export function isParameters(nodes: any[], options: any = {}) {
  const {
    error
  } = options
  if (!nodes.every(isParameter)) {
    error && error('All nodes must be parameters', {
      nodes
    })
  }
}

export function createParametersTester(node: any, options: any = {}): ParametersTester | undefined {
  if (!isParameters(node, options)) return
  return new ParametersTester(node, options)
}

export class ParametersTester extends BaseTester {
  parameter: ParameterTester
  nodes: ts.ParameterDeclaration[]

  constructor(nodes: any, options: any) {
    super(nodes, options)
    this.nodes = nodes
  }

  /**
   * Convenient alias
   */
  get parameters() {
    return this.nodes
  }

  /**
   * Query parameters
   * @param query the query to perform
   */
  test(query: any) {
    return this.testNames(query.names) &&
      this.testTypes(query.types) &&
      this.testDecorators(query.decorators)
  }

  /**
   * TODO: Use it instead of relying only on ListTester
   * Create a ParameterTester for the node
   * @param node
   */
  createParameterTester(node: any) {
    return createParameterTester(node, this.options)
  }

  /**
   * Collect info for parameters
   */
  info() {
    return {
      names: this.names,
      types: this.types,
      items: this.items
    }
  }

  /**
   * The list of parameter types
   */
  get types() {
    return this.parameters.map(typeName) || []
  }

  /**
   * The list of parameter decorators
   */
  get decorators() {
    return this.parameters.map(decoratorName) || []
  }

  /**
   * The list of parameter names
   */
  get names() {
    return this.parameters.map(nameOf) || []
  }

  /**
   * The list of parameter items
   * each item has: name, type, decorators and initializer details
   */
  get items() {
    return this.parameters.map(idDetails) || []
  }

  /**
   * Query the parameter names
   * @param query
   */
  testNames(query: any) {
    return this.queryItems(this.names, query)
  }

  /**
   * Query the parameter types
   * @param query
   */
  testTypes(query: any) {
    return this.queryItems(this.types, query)
  }

  /**
   * Query the parameter items
   * @param query
   */
  testDecorators(query: any) {
    return this.queryItems(this.decorators, query)
  }

  /**
   * Query the parameter items
   * @param query
   */
  testItems(query: any, options: any = {}) {
    return this.queryItems(this.items, query, this.createItemTesterOpts(options))
  }

  /**
   * Create items tester options for testItems
   * Creates custom createTester factory that uses ParameterTester to test on each item
   * @param options
   * @returns { Object } item tester options
   */
  createItemTesterOpts(options: any = {}) {
    const createTester = (items: any[]) => {
      return (node: any, query: any) => {
        return this.createParameterTester(node).test(query)
      }
    }
    return Object.assign(options, {
      createTester
    })
  }

}
