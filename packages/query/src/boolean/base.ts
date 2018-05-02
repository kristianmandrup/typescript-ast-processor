import { Loggable } from '../loggable'
import { isObject, isEmpty, isArray } from '../util'
import { createListTester } from '../matcher/list'

interface IBooleanQuery {}

export class BooleanQuery extends Loggable implements IBooleanQuery {
  tester: any
  value: any

  constructor(options: any = {}, tester?: Function) {
    super(options)
    this.tester = tester || this.createTester()
    this.value = options.value
  }

  /**
   * Create tester to use
   */
  createTester() {
    const { options } = this
    return options.tester || createListTester(options)
  }

  /**
   * Default boolean logic iterator
   * - find: OR (one must match)
   * - every: AND (all must match)
   */
  get iterator() {
    return 'find'
  }

  /**
   * Boolean combination logic of query results
   * @param query
   * @param tester
   */
  combinedLogic(query: any, tester: Function): boolean {
    const resultObj = this.combinedQuery(query, tester)
    const combinedResults = Object.values(resultObj)
    return Boolean(
      combinedResults[this.iterator]((result: any) => Boolean(result)),
    )
  }

  /**
   * Perform single query (in query loop)
   * @param acc
   * @param key
   * @param query
   * @param tester
   */
  singleQuery(acc: any, key: string, query: any, tester: Function) {
    const result = tester(
      {
        [key]: query[key],
      },
      this.value,
    )
    if (result) acc[key] = result
    return acc
  }

  /** */
  objKey(obj: any) {
    return obj.name || Object.keys(obj)[0]
  }

  /**
   * Keys of query object
   * @param query
   */
  objKeys(query: any) {
    if (!isObject(query)) return
    return Object.keys(query)
  }

  /**
   * Keys of query list
   * @param query
   */
  listKeys(query: any) {
    if (!isArray(query)) return
    return query.map((item: any) => this.objKey(item))
  }

  /**
   * keys of query
   * @param query
   */
  keysOf(query: any) {
    return this.listKeys(query) || this.objKeys(query) || 'undefined'
  }

  /**
   * Combined query, combining all tests
   * @param query
   * @param tester
   */
  combinedQuery(query: any, tester: Function): any {
    if (!query) return false
    const keys = this.keysOf(query)
    return keys.reduce((acc: any, key: string) => {
      return this.singleQuery(acc, key, query, tester)
    }, {})
  }

  /**
   * Handle invalid query
   * TODO: possibly throw?
   * @param msg
   * @param query
   */
  invalidQuery(msg: string, query: any): boolean {
    this.error('query: invalid query', {
      query,
    })
    return false
  }

  /**
   * Validate query
   * @param query
   */
  _validateQuery(query: any): boolean {
    if (!query) {
      return this.invalidQuery('validateQuery: missing query', query)
    }
    if (!isObject(query) || isEmpty(query)) {
      return this.invalidQuery('validateQuery: invalid query', query)
    }
    if (isEmpty(query)) {
      return this.invalidQuery('validateQuery: empty query', query)
    }
    return query
  }

  /**
   * By default return true if no query passes, otherwise false
   * @param query
   * @param tester
   */
  query(query: any, tester?: Function): any {
    query = this.validateQuery(query)
    if (!query) return {}
    const matcherFn = tester || this.tester
    return this.combinedQuery(query, matcherFn)
  }

  /**
   * Query key
   */
  get queryKey(): string {
    this.error('subclass must add queryKey property or accessor')
    return 'x'
  }

  /**
   * Validate query
   * @param query
   */
  validateQuery(query: any): boolean {
    const resolvedQuery = this.resolveQuery(query)
    return this._validateQuery(query) && this._validateQuery(resolvedQuery)
  }

  /**
   * Resolve query
   * @param query
   */
  resolveQuery(query: any): any {
    if (!query) return {}
    return query[this.queryKey]
  }

  /**
   *
   * @param query
   * @param tester
   */
  test(query: any, tester?: Function): boolean {
    query = this.validateQuery(query)
    const matcherFn = tester || this.tester
    return query ? this.combinedLogic(query, matcherFn) : matcherFn(query)
  }

  /**
   * Alias to test
   * @param query
   * @param tester
   */
  match(query: any, tester?: Function): boolean {
    return this.test(query, tester)
  }
}
