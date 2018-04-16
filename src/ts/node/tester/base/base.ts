import { Loggable } from '../../../loggable'
import {
  resolveArrayIteratorFindMethod,
  testOr,
  testAnd,
  testNot,
  testNames,
  camelize,
} from '../util'
import { IDetailsTester } from '../../details/base'

export interface INodeTester {
  parentBlocks?: any[]
  isNested?: boolean
  nestedLevels?: number

  test(query: any): boolean
  query(query: any): any
  info(): any
}

import { isDefined, isStr, capitalize } from '../../../util'

export abstract class BaseNodeTester extends Loggable implements INodeTester {
  // properties to test, query and gather info for
  _props: string[] = []
  qprops: string[] = []
  queries: any
  queryResult: any
  // maps of testers used by tester
  testers: any = {
    node: {},
    details: {},
  }
  factories: any = {}
  _occurrenceTester: any // INodeOccurrenceTester

  /**
   * Create BaseTester
   * @param node
   * @param options
   */
  constructor(public node: any, options: any) {
    super(options)
    this.factories = options.factories
    this.init(node)
  }

  /**
   * Validate node tester before initialization
   * @param node
   */
  validateInit(node: any) {
    if (!this.factories) {
      this.error('Missing factories in options', {
        options: this.options,
      })
    }

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
    this.validateInit(node)
    this.node = node
    this.initProps()
    this.setTesters()
    this.initQueries()
    this.initInfoProps()
    this.initPropTesters()
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
   * Initialize prop testers (query methods)
   */
  initPropTesters() {
    const testMethodMap = this.testMethodMap
    this.propKeys.map((key: string) => {
      const fnName = `test${capitalize(key)}`
      const test = testMethodMap[key]
      const fn = (query: any) => {
        this.runTest({
          ...test,
          query,
        })
      }
      this[fnName] = fn
    })
  }

  get testMethodMap() {
    return {}
  }

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
   * Initialize queries object
   */
  initQueries() {
    this.queries = this.resolveQueries()
  }

  /**
   * Test if valid query
   * @param query
   */
  isQuery(query: any) {
    return isDefined(query)
  }

  /**
   * Set a tester (helper) on the node tester
   * @param opts
   */
  setTester(opts: any = {}) {
    const { type = 'node', name, factory, node, options } = opts
    this.testers[type][name || factory] = this.createCategoryTester(
      type,
      factory,
      node || this.node,
      options || this.options,
    )
    return this
  }

  setTesters() {
    Object.keys(this.testerMap).map((key: string) => {
      const val = this.testerMap[key]
      const data = isStr(val) ? { factory: val } : val
      this.setTester({
        name: key,
        ...data,
      })
    })
  }

  get testerMap() {
    return {}
  }

  /**
   * Perform a test using a node tester
   * @param opts
   */
  runTest(opts: any = {}) {
    const { query, name, bool, qprop, type = 'node', test = 'test' } = opts

    const propQuery = query[qprop || name]
    if (!this.isQuery(propQuery)) return true

    if (bool) {
      if (typeof bool !== 'string') {
        this.error('Invalid bool: must be a method name', {
          opts,
        })
      }
      return this[bool] === propQuery
    }

    const typeTesters = this.testers[type]
    if (!typeTesters) {
      this.error('doTest: invalid type', {
        type,
      })
    }
    const namedTester = typeTesters[name]
    if (!namedTester) {
      this.log('doTest: invalid property', {
        name,
        type,
        testers: typeTesters,
      })
    }
    return namedTester[test](propQuery)
  }

  /**
   * Get a registered tester
   * @param opts
   */
  getTester(opts: any = {}) {
    const { name, type = 'node' } = opts
    const typeTesters = this.testers[type]
    if (!typeTesters) {
      this.error('getTester: invalid type', {
        type,
        testers: this.testers,
      })
    }
    const namedTester = typeTesters[name]
    if (!namedTester) {
      this.log('getTester: invalid name', {
        name,
        testers: typeTesters,
      })
    }

    return namedTester
  }

  /**
   * Check if tester is available
   * @param opts
   */
  hasTester(opts: any = {}) {
    return Boolean(this.getTester(opts))
  }

  /**
   * Get a property of a tester
   * @param opts
   */
  getProp(opts: any = {}) {
    return this.getTester(opts)[opts.property]
  }

  /**
   * Create new or return Occurrence Node Tester
   */
  get occurrenceTester() {
    this._occurrenceTester =
      this._occurrenceTester ||
      this.createNodeTester('occurrences', this.node, this.options)
    return this._occurrenceTester
  }

  /**
   * Creates either a Node or Details tester
   * @param name
   * @param node
   * @param options
   */
  protected createTester(
    name: string,
    node: any,
    options: any = {},
  ): INodeTester | IDetailsTester {
    const factory = /details:/.test(name)
      ? 'createDetailsTester'
      : 'createNodeTester'
    name = name.replace(/\w+:/, '')
    return this[factory](name, node, options)
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
  protected createNodeTester(
    name: string,
    node?: any,
    options?: any,
  ): INodeTester {
    node = node || this.node
    options = options || this.options
    return this.createCategoryTester('node', name, node, options)
  }

  /**
   * Convenience factory for creating a node details tester
   * @param name
   * @param node
   * @param options
   */
  protected createDetailsTester(
    name: string,
    node: any,
    options: any = {},
  ): IDetailsTester {
    return this.createCategoryTester('details', name, node, options)
  }

  /**
   * Perform query on node and return true if full query (ie. all sub-queries pass) or false otherwise
   * Subclass should always override or extend
   * @param query
   */
  test(query: any) {
    return this.runTests(query)
  }

  /**
   * Perform query, returning reduce name/value result with each sub-query result
   * Subclass should always override or extend
   * @returns { Object } node information
   */
  public query(query: any): any {
    return this.runQueries(query)
  }

  /**
   * Resolve property testers
   * @param prop
   */
  protected resolvePropTester(prop: string) {
    const testFnName = `test${camelize(prop)}`
    const queryFnName = `query${camelize(prop)}`
    return this[queryFnName] || this[testFnName]
  }

  /**
   * Resolves queries
   */
  protected resolveQueries() {
    return this.props.reduce((acc: any, prop: string) => {
      const tester = this.resolvePropTester(prop)
      if (!tester) return acc
      acc[prop] = tester.bind(this)
      return acc
    }, {})
  }

  /**
   * Performs property queries using each of the resolved query functions
   * See resolveQueries
   * @param query
   */
  public runQueries(query: any) {
    const queryKeys = Object.keys(this.queries)
    return queryKeys.reduce((acc: any, key: string) => {
      const queryFn = this.queries[key]
      acc[key] = queryFn(query)
      return acc
    }, {})
  }

  /**
   * Performs property queries using each of the resolved query functions
   * See resolveQueries
   * @param query
   */
  public runTests(query: any) {
    const queryKeys = Object.keys(this.queries)
    return queryKeys.every((key: string) => {
      const queryFn = this.queries[key]
      return Boolean(queryFn(query))
    }, {})
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
  public info(): any {
    return this.propKeys.reduce((acc: any, propName: string) => {
      acc[propName] = this[propName]
      return acc
    }, {})
  }

  /**
   * Count occurences in sub tree(s) under this node
   * Call ASTNodeTraverser with traverseQuery to control which nodes to exclude/include in visit count
   * @param traverseQuery
   */
  countInTree(query: any): number {
    return this.occurrenceTester.countInTree(query)
  }

  /**
   * Count occurences in subtree
   * TODO: extract and use from utility class
   * @param options
   */
  countOccurrence(options: any = {}): number {
    return this.occurrenceTester.countOccurrence(options)
  }

  /**
   * Querying number of specific items such as cases, statements, blocks etc
   * @param query
   * @param count
   */
  testCount(query: any, count: number) {
    query = query.count || query

    // normalize
    query.min = query.min || 0
    query.max = query.max || 999

    if (count < query.min) return false
    if (count > query.max) return false
    if (query.eq && query.eq !== count) return false
    return true
  }

  /**
   * Many node tests are on modifiers collection
   * Used a lot in node details testers
   */
  get modifiers() {
    return this.node.modifiers || []
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
  createTesterFor(options: any) {
    const createNamesTester = (nodes: any[]) => {
      return (queryExpr: any) => testNames(nodes, queryExpr)
    }
    const createTester = options.createTester || createNamesTester
    return this.createListTester(
      this.node,
      Object.assign(options, {
        createTester,
      }),
    )
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
    return this.createTesterFor(options).test(query)
  }

  /**
   * return a generic method to test an array-like structure
   * @param obj
   */
  arrayIteratorFindMethod(obj: any): any {
    return resolveArrayIteratorFindMethod(obj, this.options)
  }

  /**
   * Boolean NOT condition on query (or result)
   * @param query
   * @param tester
   */
  protected testNot(query: any, tester: Function) {
    return testNot(query, tester)
  }

  /**
   * Boolean OR condition on one or more queries (or results)
   * @param query
   * @param tester
   */
  protected testOr(query: any, tester: Function) {
    return testOr(query, tester)
  }
}
