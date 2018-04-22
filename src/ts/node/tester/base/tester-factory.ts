import { Loggable } from '../../../loggable'
import { INodeTester } from '.'
import { IDetailsTester } from '../../details/base'
import { testNames } from '../util'
import { isFunction } from '../../../util'

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
  _occurrenceTester: any

  constructor(node: any, options: any = {}) {
    super(options)
    this.node = node
    this.factories = options.factories
    this.init()
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
  }

  get occurrenceTester() {
    this._occurrenceTester =
      this._occurrenceTester || this.createNodeTester('occurrences')
    return this._occurrenceTester
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
    const node = options.node || this.node
    return this.createListTester(node, {
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
    const resolvedFactory = this[factory].bind(this)
    if (!isFunction(resolvedFactory)) {
      this.error('No such factory method', {
        factory,
      })
    }
    // this.log('createTester', {
    //   resolvedFactory,
    // })
    return resolvedFactory(testerName, node, options)
  }

  /**
   * Resolve a factory category map
   * @param category
   */
  resolveFactoryMapCategory(category: string) {
    // this.log('resolveFactoryMapCategory', {
    //   category,
    //   factories: this.factories,
    // })
    return this.factories[category]
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
    const factoryCategory = this.resolveFactoryMapCategory(category)
    if (!factoryCategory) {
      this.error('Invalid factory category', {
        factories: this.factories,
        category,
        factoryCategory,
      })
    }
    const createTester = factoryCategory.createTester
    // this.log('createCategoryTester', {
    //   category,
    //   factories: this.factories,
    //   factoryCategory,
    //   name,
    //   createTester,
    // })
    if (!isFunction(createTester)) {
      this.error(
        'createCategoryTester: factory category missing createTester',
        {
          factoryCategory,
        },
      )
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
