import { Loggable } from '../../../loggable'
import { capitalize } from '../../../util'
import {
  camelize,
  testOr,
  testAnd,
  testNot,
  testName,
  testNames,
  testValue,
} from '../util'

/**
 * Factory to create query engine
 * @param options
 */
export function createQueryEngine(tester: any, options: any = {}) {
  return new QueryEngine(tester, options)
}

export class QueryEngine extends Loggable {
  tester: any
  queries: any
  queryResult: any
  testMethodMap: any
  propKeys: any
  isQuery: Function
  testers: any
  props: any

  constructor(tester: any, options: any = {}) {
    super(options)
    this.tester = tester
    this.testMethodMap = tester.testMethodMap
    this.propKeys = tester.propKeys
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
  }

  /**
   * Initialize queries object
   */
  initQueries() {
    this.queries = this.resolveQueries()
  }

  /**
   * Initialize prop testers (query methods)
   */
  initPropTesters() {
    const testMethodMap = this.testMethodMap
    this.propKeys.map((key: string) => {
      const fnName = `test${capitalize(key)}`
      const test = testMethodMap[key]
      let fn
      if (typeof test === 'function') {
        fn = test.bind(this)
      } else {
        fn = (query: any) => {
          this.runTest({
            ...test,
            query,
          })
        }
      }
      this[fnName] = fn
    })
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

  queryName(name: string, query: any) {
    return testName(name, query)
  }

  queryNames(names: string[], query: any) {
    return testNames(names, query)
  }

  queryValue(value: any, query: any) {
    return testValue(value, query)
  }

  /**
   * Boolean NOT condition on query (or result)
   * @param query
   * @param tester
   */
  testNot(query: any, tester: Function) {
    return testNot(query, tester)
  }

  /**
   * Boolean AND condition on query
   * @param query
   * @param tester
   */
  testAnd(query: any, tester: Function) {
    return testAnd(query, tester)
  }

  /**
   * Boolean OR condition on one or more queries (or results)
   * @param query
   * @param tester
   */
  testOr(query: any, tester: Function) {
    return testOr(query, tester)
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
    return this[queryFnName] || this[testFnName]
  }

  /**
   * Resolves queries
   */
  resolveQueries() {
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
}
