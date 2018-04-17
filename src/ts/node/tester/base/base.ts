import { Loggable } from '../../../loggable'

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
import { createTesterRegistry } from './tester-registry'
import { createQueryEngine } from './query-engine'
import { createNodeCounter } from './node-counter'

export abstract class BaseNodeTester extends Loggable implements INodeTester {
  // properties to test, query and gather info for
  _props: string[] = []
  qprops: string[] = []
  queries: any
  queryResult: any
  factory: any
  testerRegistry: any
  queryEngine: any
  nodeCounter: any

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
   * caption used for error logging, debugging and testing
   */
  get caption() {
    return this.constructor.name
  }

  /**
   * The basic tester category
   */
  get category() {
    return 'NodeTester'
  }

  /**
   * Delegate to query engine to test count
   * @param query
   */
  testCount(query: any, count: number) {
    return this.queryEngine.testCount(query, count)
  }

  /**
   * set a tester
   * @param opts
   */
  setTester(opts: any) {
    return this.factory.setTester(opts)
  }

  /**
   * Validate node tester before initialization
   * @param node
   */
  validateInit(node?: any) {
    node = node || this.node
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
    const { options, node } = this

    this.nodeCounter = createNodeCounter(this, options)
    this.factory = createTesterFactory(node, options)
    this.testerRegistry = createTesterRegistry(options)
    this.queryEngine = createQueryEngine(this, options)
  }

  countOccurrence(opts: any = {}) {
    return this.nodeCounter.countOccurrence(opts)
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

  test(query: any): boolean {
    return this.queryEngine.test(query)
  }

  query(query: any): boolean {
    return this.queryEngine.query(query)
  }
}
