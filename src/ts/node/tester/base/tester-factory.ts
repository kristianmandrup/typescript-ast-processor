import { Loggable } from '../../../loggable'
import { INodeTester } from '.'
import { IDetailsTester } from '../../details/base'
import { testNames } from '../util'

/**
 * Factory to create class tester to query and collect data for class node
 * @param node
 * @param options
 */
export function createTesterFactory(node: any, options: any = {}) {
  return new TesterFactory(node, options)
}

export class TesterFactory extends Loggable {
  node: any
  factories: any
  occurrenceTester: any

  constructor(node: any, options: any = {}) {
    super(options)
    this.node = node
    this.factories = options.factories
  }

  /**
   * Initialize
   */
  init() {
    if (!this.factories) {
      this.error('Missing factories in options', {
        options: this.options,
      })
    }
    this.occurrenceTester = this.createNodeTester('occurrences')
  }

  /**
   * Create a tester object to test a list of nodes
   * @param node
   * @param options
   */
  createListTester(node: any, options: any = {}) {
    return this.createNodeTester('list', node, options)
  }

  /**
   * Create a tester object using ListTester to test a collection for matching names
   * @param options
   */
  createListTesterFor(options: any) {
    const createNamesTester = (nodes: any[]) => {
      return (queryExpr: any) => testNames(nodes, queryExpr)
    }
    const createTester = options.createTester || createNamesTester
    return this.createListTester(this.node, {
      ...options,
      createTester,
    })
  }

  /**
   * Resolve factory name
   * May use a prefix of the form node:class or details:function
   *  - details:
   *  - node:
   * @param name
   */
  resolveFactoryName(name: string) {
    const factory = /details:/.test(name)
      ? 'createDetailsTester'
      : 'createNodeTester'
    const testerName = name.replace(/\w+:/, '')
    return { testerName, factory }
  }

  /**
   * Creates either a Node or Details tester
   * @param name
   * @param node
   * @param options
   */
  createTester(name: string, node?: any, options?: any): any {
    node = node || this.node
    options = options || this.options
    const { testerName, factory } = this.resolveFactoryName(name)
    return this[factory](testerName, node, options)
  }

  /**
   * Convenience factory for creating a node tester
   * @param name
   * @param node
   * @param options
   */
  createCategoryTester(
    category: string,
    name: string,
    node?: any,
    options?: any,
  ): any {
    node = node || this.node
    options = options || this.options
    const factoryCategory = this.factories[category]
    if (!factoryCategory) {
      this.error('Invalid factory category', {
        factories: this.factories,
        category,
        factoryCategory,
      })
    }
    return factoryCategory.createTester(name, node, options)
  }

  /**
   * Convenience factory for creating a node tester
   * @param name
   * @param node
   * @param options
   */
  createNodeTester(name: string, node?: any, options?: any): INodeTester {
    return this.createCategoryTester('node', name, node, options)
  }

  /**
   * Convenience factory for creating a node details tester
   * @param name
   * @param node
   * @param options
   */
  createDetailsTester(name: string, node?: any, options?: any): IDetailsTester {
    return this.createCategoryTester('details', name, node, options)
  }
}
