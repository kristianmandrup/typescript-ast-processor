import { Loggable } from '../../../loggable'
import { createTesterFactory } from './tester-factory'
import { createTesterRegistry } from './tester-registry'
import { createQueryEngine } from './query-engine'
import { createNodeCounter } from './node-counter'

export interface INodeTester {
  shortName: string
  caption: string
  category: string
  qprops: string[]
}

export abstract class NodeTester extends Loggable implements INodeTester {
  // properties to test, query and gather info for
  infoProps: any
  _props: string[] = []
  queries: any
  queryResult: any
  factory: any
  testerRegistry: any
  queryEngine: any
  nodeCounter: any
  node: any
  _shortName: string

  /**
   * Create BaseTester
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(options)
    this.init(node)
  }

  /**
   * short name
   */
  get shortName() {
    this._shortName =
      this._shortName ||
      this.caption
        .replace(/NodeTester$/, '')
        .replace(/Tester$/, '')
        .toLowerCase()
    return this._shortName
  }

  /**
   * Query props
   */
  get qprops(): string[] {
    return []
  }

  /**
   * The basic tester category
   */
  get category() {
    return 'NodeTester'
  }

  /**
   * Map of tester configurations
   */
  get testerMap() {
    return {}
  }

  /**
   * Get property keys
   */
  get propKeys() {
    return this.props
  }

  /**
   * Many node tests are on modifiers collection
   * Used a lot in node details testers
   */
  get modifiers() {
    return this.node.modifiers || []
  }

  /**
   * Initialize
   * @param node
   */
  init(node?: any) {
    this.node = node || this.node
    this.validateInit()
    this.configure()

    this.factory.init()
    this.initProps()

    this.testerRegistry.init()
    this.queryEngine.init()
    this.initInfoProps()
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

  get infoPropsMap() {
    return {}
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
   * Validate node tester before initialization
   * @param node
   */
  validateInit() {
    const { node } = this
    if (!node) {
      this.error(`validateInit: missing node`, {
        node,
        options: this.options,
        ctx: this,
      })
    }
  }

  /**
   * Delegate to query engine
   * @param query
   */
  testCount(query: any, count: number) {
    return this.queryEngine.testCount(query, count)
  }

  /**
   * Delegate to query engine
   * @param query
   */
  testNot(query: any, tester: any) {
    return this.queryEngine.testNot(query, tester)
  }

  /**
   * Delegate to query engine
   * @param query
   */
  testOr(query: any, tester: any) {
    return this.queryEngine.testOr(query, tester)
  }

  /**
   * Delegate to query engine
   * @param query
   */
  testAnd(query: any, tester: any) {
    return this.queryEngine.testAnd(query, tester)
  }

  /**
   * set a tester
   * @param opts
   */
  setTester(opts: any) {
    return this.testerRegistry.setTester(opts)
  }

  /**
   * Set testers using testerMap
   */
  setTesters() {
    return this.testerRegistry.setTesters()
  }

  /**
   * Check if tester is available
   * @param opts
   */
  hasTester(opts: any = {}) {
    return this.testerRegistry.hasTester(opts)
  }

  /**
   * Get a property of a tester
   * @param opts { string | object }
   */
  getProp(opts: any = {}) {
    return this.testerRegistry.getProp(opts)
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
   * Configure node tester
   */
  configure() {
    const { options, node } = this
    this.factory = createTesterFactory(this, node, options)
    this.testerRegistry = createTesterRegistry(this, options)
    this.nodeCounter = createNodeCounter(this, options)
    this.queryEngine = createQueryEngine(this, options)
    return this
  }
}
