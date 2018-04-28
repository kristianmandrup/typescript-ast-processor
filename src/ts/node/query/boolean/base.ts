import { Loggable } from '../../../loggable'

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
    const combinedResults = Object.values(this.combined(query, tester))
    return combinedResults[this.iterator]((result: any) => Boolean(result))
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
   * Combined and query, combining all tests
   * @param query
   * @param tester
   */
  combined(query: any, tester: Function): any {
    if (!query) return false
    const keys = Object.keys(query)
    this.log('andQuery', {
      query,
      keys,
    })
    return keys.reduce((acc, key: string) => {
      return this.singleQuery(acc, key, query, tester)
    }, {})
  }

  /**
   * Validate query
   * @param query
   */
  validateQuery(query: any): boolean {
    if (!query) {
      this.log('query: missing query', {
        query,
      })
      return false
    }
    return true
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
    return this.combined(query, matcherFn)
  }
}
