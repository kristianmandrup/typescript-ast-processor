import { Loggable } from '../../../loggable'
import { resolveArrayIteratorFindMethod } from '../util'

export interface INodeTester {
  parentBlocks?: any[]
  isNested?: boolean
  nestedLevels?: number

  test(query: any): boolean
  query(query: any): any
  info(): any
}

import { isDefined } from '../../../util'
import { createTesterFactory } from './tester-factory'
import { IDetailsTester } from '../../details/base'
import { createTesterRegistry } from './tester-registry'
import { createQueryEngine } from './query-engine'

export abstract class BaseNodeTester extends Loggable implements INodeTester {
  // properties to test, query and gather info for
  _props: string[] = []
  qprops: string[] = []
  queries: any
  queryResult: any
  factory: any
  testerRegistry: any
  queryEngine: any

  /**
   * Create BaseTester
   * @param node
   * @param options
   */
  constructor(public node: any, options: any) {
    super(options)
    this.init(node)
  }

  /**
   * Validate node tester before initialization
   * @param node
   */
  validateInit(node: any) {
    this.factory.init()
    if (!node) {
      this.error(`BaseTester: Missing node to test`, {
        node,
        options: this.options,
        constructor: this.constructor.name,
      })
    }
  }

  /**
   * Initialize
   * @param node
   */
  init(node?: any) {
    this.configure()
    this.validateInit(node)

    this.node = node

    this.initProps()
    this.testerRegistry.init()
    this.queryEngine.init()
    this.initInfoProps()
  }

  setTesters() {
    return this.testerRegistry.setTesters()
  }

  configure() {
    this.factory = createTesterFactory(this.node, this.options)
    this.testerRegistry = createTesterRegistry(this.options)
    this.queryEngine = createQueryEngine(this, this.options)
  }

  /**
   * Override in subclass to initialize props!
   */
  initProps() {
    this.props = this.qprops || []
  }

  /**
   * Set info props used to gather property info
   */
  initInfoProps() {}

  /**
   * Test method map used to generate test methods (that mostly call node and detail testers)
   * NOTE: Subclass override
   */
  get testMethodMap() {
    return {}
  }

  /**
   * Set props
   */
  set props(props: any) {
    this._props = Array.isArray(props)
      ? props
      : Object.keys(props).filter((prop) => prop)
  }

  /**
   * Get registered props
   */
  get props() {
    return this._props || []
  }

  /**
   * Test if valid query
   * @param query
   */
  isQuery(query: any) {
    return isDefined(query)
  }

  get testerMap() {
    return {}
  }

  /**
   * Check if tester is available
   * @param opts
   */
  hasTester(opts: any = {}) {
    return this.testerRegistry.hasTester(opts)
  }

  /**
   * Get a registered tester
   * @param opts
   */
  getTester(opts: any = {}) {
    return this.testerRegistry.getTester(opts)
  }

  /**
   * Creates either a Node or Details tester
   * @param name
   * @param node
   * @param options
   */

  createTester(name: string, node: any, options: any = {}): any {
    return this.factory.createTester(name, node, options)
  }

  /**
   * Convenience factory for creating a node tester
   * @param name
   * @param node
   * @param options
   */
  protected createCategoryTester(
    category: string,
    name: string,
    node: any,
    options: any = {},
  ): any {
    return this.factory.createCategoryTester(name, node, options)
  }

  /**
   * Convenience factory for creating a node tester
   * @param name
   * @param node
   * @param options
   */
  createNodeTester(name: string, node?: any, options?: any): INodeTester {
    return this.factory.createNodeTester(name, node, options)
  }

  /**
   * Convenience factory for creating a node details tester
   * @param name
   * @param node
   * @param options
   */
  createDetailsTester(
    name: string,
    node: any,
    options: any = {},
  ): IDetailsTester {
    return this.factory.createNodeTester(name, node, options)
  }

  /**
   * Get property keys
   */
  get propKeys() {
    return this.props
  }

  /**
   * Return object with node information
   * Subclass should always override or extend
   * @returns { Object } node information
   */
  info(): any {
    return this.propKeys.reduce((acc: any, propName: string) => {
      acc[propName] = this[propName]
      return acc
    }, {})
  }

  /**
   * Many node tests are on modifiers collection
   * Used a lot in node details testers
   */
  get modifiers() {
    return this.node.modifiers || []
  }

  /**
   * Create tester for testing items and test using query
   * By default creates a name tester
   * You can override by passing a createTester factory function
   * A custom factory function must take a nodes collection as argument
   * the function must return a function that takes a query expression argument
   * and returns a query result on the nodes
   * @param items set of nodes to query
   * @param query the query expression
   */
  queryItems(items: any[], query: any, options: any = {}) {
    options = Object.assign(options, { items })
    return this.factory.createTesterFor(options).test(query)
  }

  /**
   * return a generic method to test an array-like structure
   * @param obj
   */
  arrayIteratorFindMethod(obj: any): any {
    return resolveArrayIteratorFindMethod(obj, this.options)
  }

  test(query: any): boolean {
    return this.queryEngine.test(query)
  }

  query(query: any): boolean {
    return this.queryEngine.query(query)
  }
}
