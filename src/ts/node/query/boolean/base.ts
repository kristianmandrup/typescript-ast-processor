import { Loggable } from '../../../loggable'
import { isObject, isEmpty } from '../../../util'

interface IBooleanQuery {}

export class BooleanQuery extends Loggable implements IBooleanQuery {
  tester: any

  constructor(options: any = {}, tester?: Function) {
    super(options)
    this.tester = tester || options.tester
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
    this.log('combinedLogic', {
      query,
      iterator: this.iterator,
      combinedResults,
      resultObj,
    })

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
    const result = tester({
      [key]: query[key],
    })
    if (result) acc[key] = result
    return acc
  }

  /**
   * Combined query, combining all tests
   * @param query
   * @param tester
   */
  combinedQuery(query: any, tester: Function): any {
    if (!query) return false
    const keys = Object.keys(query)
    // this.log('combinedQuery', {
    //   query,
    //   keys,
    // })
    return keys.reduce((acc, key: string) => {
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
      return this.invalidQuery('query: missing query', query)
    }
    if (!isObject(query) || isEmpty(query)) {
      return this.invalidQuery('query: invalid query', query)
    }
    return query
  }

  /**
   * By default return true if no query passes, otherwise false
   * @param query
   * @param tester
   */
  query(query: any, tester?: Function): any {
    const valid = this.validateQuery(query)
    if (!valid) return {}
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
    return query[this.queryKey]
  }

  /**
   *
   * @param query
   * @param tester
   */
  test(query: any, tester?: Function): boolean {
    const matcherFn = tester || this.tester
    query = query[this.queryKey]
    return query ? this.combinedLogic(query, matcherFn) : matcherFn(query)
  }
}
