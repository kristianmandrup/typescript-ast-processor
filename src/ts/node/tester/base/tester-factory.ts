import { Loggable } from '../../../loggable'
import { INodeTester } from '.'
import { IDetailsTester } from '../../details/base'
import { testNames } from '../util'
import { isFunction, isStr } from '../../../util'

/**
 * Factory to create class tester to query and collect data for class node
 * @param tester { INodeTester }
 * @param node
 * @param options
 */
export function createTesterFactory(tester: any, node: any, options: any = {}) {
  return new TesterFactory(tester, node, options)
}

export class TesterFactory extends Loggable {
  node: any
  factories: any
  _occurrenceTester: any
  tester: INodeTester

  /**
   * Create testr factory
   * @param tester
   * @param node
   * @param options
   */
  constructor(tester: INodeTester, node: any, options: any = {}) {
    super(options)
    this.tester = tester
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
      ...this.options,
      ...options,
      createTester,
    })
  }

  protected validateName(name: string, method: string): void {
    if (!isStr(name)) {
      this.error('resolveFactoryName: invalid name', {
        name,
      })
    }
  }
  /**
   * Resolve factory name
   * May use a prefix of the form node:class or details:function
   *  - details:
   *  - node:
   * @param name
   */
  resolveFactoryName(name: string) {
    this.validateName(name, 'resolveFactoryName')
    const factory = /details:/.test(name)
      ? 'createDetailsTester'
      : 'createNodeTester'
    const testerName = name.replace(/\w+:/, '')
    return { testerName, factory }
  }

  /**
   * Test if tester to be created is circular
   * @param category
   * @param name
   */
  isCircular(category: string, name: string) {
    return category === 'node' && name === this.tester.shortName
  }

  /**
   * Validate and warn if creating this (node) tester is circular
   * ie. potentially creating self in infinite loop
   * @param category
   * @param name
   * @param method
   */
  validateCircular(category: string, name: string, method: string) {
    if (this.isCircular(category, name)) {
      this.warn('${method}: circular', {
        category,
        name,
        method,
      })
    }
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
    this.validateName(name, 'createTester')
    const { testerName, factory } = this.resolveFactoryName(name)
    const resolvedFactory = this[factory].bind(this)
    if (!isFunction(resolvedFactory)) {
      this.error('No such factory method', {
        factory,
      })
    }
    return resolvedFactory(testerName, node, options)
  }

  /**
   * Resolve a factory category map
   * @param category
   */
  resolveFactoryMapCategory(category: string) {
    this.validateName(category, 'resolveFactoryMapCategory')
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
    this.validateName(category, 'createCategoryTester')

    const factoryCategory = this.resolveFactoryMapCategory(category)
    if (!factoryCategory) {
      this.error('Invalid factory category', {
        factories: this.factories,
        category,
        factoryCategory,
      })
    }

    const createTester = factoryCategory.createTester
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
    this.validateCircular('node', name, 'createNodeTester')
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
