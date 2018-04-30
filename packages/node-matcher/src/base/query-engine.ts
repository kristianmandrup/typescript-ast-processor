import { Loggable } from '../../../loggable'
import { isFunction, isEmpty, lowercaseFirst } from '../../../util'
import { findDerived } from 'find-derived'
import { camelize } from '../util'
import { createGenericQuery } from '../../query'

/**
 * Factory to create query engine
 * @param options
 */
export function createQueryEngine(tester: any, options: any = {}) {
  return new QueryEngine(tester, options)
}

interface IQueryApi {
  match(query: any, value?: any): boolean
  query(query: any, value?: any): boolean
}

export class QueryEngine extends Loggable {
  tester: any
  queries: any
  queryResult: any
  testMethodMap: any
  testMethods: any = {}
  _propKeys: any
  isQuery: Function
  testers: any
  props: any
  $queryApi: IQueryApi

  constructor(tester: any, options: any = {}) {
    super(options)
    this.tester = tester
    this.testMethodMap = tester.testMethodMap
    this._propKeys = tester.propKeys
    this.isQuery = tester.isQuery
    this.testers = tester.testers
    this.props = tester.props
  }

  /**
   * Initialize
   */
  init() {
    this.initPropTesters()
    this.initQueries()
    this.$queryApi = this.createQueryApi()
  }

  createQueryApi(): IQueryApi {
    return createGenericQuery(this.options)
  }

  /**
   * Initialize queries object
   */
  initQueries() {
    this.queries = this.resolveQueries()
  }

  /**
   * Property keys to use for generating tester info object
   */
  get propKeys() {
    return this._propKeys || []
  }

  /**
   * Initialize prop testers (query methods)
   */
  initPropTesters() {
    if (isEmpty(this.propKeys)) {
      // this.warn('no prop keys', {
      //   propKeys: this.propKeys,
      // })
      return
    }
    const initPropTester = this.initPropTester.bind(this)
    this.propKeys.map(initPropTester)
  }

  /**
   * TODO: use proper camelize
   * resolve test method name
   * @param name
   */
  testMethodName(name: string) {
    // return `test${capitalize(name)}`
    return lowercaseFirst(name)
  }

  /**
   * Resolve a prop tester function
   * @param testFn
   */
  resolvePropTesterFn(testFn: Function) {
    if (typeof test === 'function') {
      return test.bind(this)
    } else {
      return (query: any) => {
        this.runTest({
          ...test,
          query,
        })
      }
    }
  }

  /**
   * Initialize property tester
   * @param key
   */
  initPropTester(key: string) {
    const testMethodMap = this.testMethodMap
    const fnName = this.testMethodName(key)
    const testFn = testMethodMap[key]
    let resolvedFn = this.resolvePropTesterFn(testFn)
    this.testMethods[fnName] = resolvedFn
    return this
  }

  /**
   * NOTE: Replaces queryName, queryNames etc. using generic query
   * Query for a name match (ie. string value match )
   * @param name
   * @param query
   */
  queryValue(value: any, query: any) {
    return this.$queryApi.query(value, query)
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
  query(query: any): any {
    return this.runQueries(query)
  }

  /**
   * Resolve property testers
   * @param prop
   */
  resolvePropTester(prop: string) {
    const testFnName = `test${camelize(prop)}`
    const queryFnName = `query${camelize(prop)}`
    return findDerived([this.tester, this.testMethods || {}], (ctx: any) => {
      return ctx[queryFnName] || ctx[testFnName]
    })
  }

  /**
   * Resolves queries
   */
  resolveQueries() {
    return this.propKeys.reduce((acc: any, prop: string) => {
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
  runQueries(query: any): any {
    const queryKeys = Object.keys(this.queries)
    return queryKeys.reduce((acc: any, key: string) => {
      const queryFn = this.queries[key]
      acc[key] = queryFn(query.key || query)
      return acc
    }, {})
  }

  /**
   * Performs property queries using each of the resolved query functions
   * See resolveQueries
   * @param query
   */
  runTests(query: any): any {
    const queryKeys = Object.keys(this.queries)
    return queryKeys.every((key: string) => {
      const queryFn = this.queries[key]
      return Boolean(queryFn(query.key || query))
    }, {})
  }

  /**
   * Perform a bool test on a property (matching true|false)
   * @param bool
   * @param propQuery
   * @param opts
   */
  evalBoolTest(bool: any, propQuery: any, opts: any = {}) {
    if (typeof bool !== 'string') {
      this.error('Invalid bool: must be a method name', {
        bool,
        propQuery,
        opts,
      })
    }
    return this[bool] === propQuery
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
      this.evalBoolTest(bool, propQuery, opts)
    }

    const typeTesters = this.testers[type]
    if (!typeTesters) {
      this.error('doTest: invalid type', {
        type,
      })
    }
    const namedTester = typeTesters[name]
    if (!namedTester) {
      this.error('doTest: invalid property', {
        name,
        type,
        testers: typeTesters,
      })
    }
    const testFn = namedTester[test]
    if (!isFunction(testFn)) {
      this.error('invalid test function', {
        test,
      })
    }
    return testFn(propQuery)
  }
}
