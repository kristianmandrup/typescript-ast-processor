import { Loggable } from '../../loggable'
import { IValueMatcher, createMatcherSelector } from './matcher'
import { isFunction } from 'util'

export interface IQuery {
  name: string
  matchers: any[]
}

type IValueMatch = IValueMatcher | IValueMatcher[]

export interface IQueryMatcher {
  query(query: any, value?: any): boolean
  match(matchers: IValueMatch, value?: any): boolean
}

export class BaseQueryMatcher extends Loggable implements IQueryMatcher {
  node: any
  value: any
  key: string

  constructor(options: any = {}) {
    super(options)
    this.node = options.node || {}
    this.init()
  }

  /**
   * Initialize
   */
  init(): IQueryMatcher {
    const { options, node } = this
    const { key, value } = options
    const testValue = isFunction(value) ? value(node) : value
    if (testValue) this.setValue(testValue)

    if (key && !this.value) this.setKey(key)
    return this
  }

  /**
   * Validate value to be used for query
   * @param value
   */
  validateValue(value: any): any {
    if (!value) {
      this.error('setValue: invalid value', {
        value,
      })
    }
    return value
  }

  /**
   * Set value to be used for query
   * @param value
   */
  setValue(value: any): IQueryMatcher {
    this.value = this.validateValue(value)
    return this
  }

  /**
   * Resolve key on node
   * @param key
   */
  resolveKey(key: string): any {
    const value = this.node[key]
    return isFunction(value) ? value() : value
  }

  /**
   * Set key for node to be used to determine value to be used for query
   * @param value
   */
  setKey(key: any, override?: boolean): IQueryMatcher {
    if (this.value || !override) return this
    const value = this.resolveKey(key)
    if (value) {
      this.setValue(value)
      this.key = key
    }

    return this
  }

  /**
   * Select matcher to be used for query, based on type of expr
   * @param expr
   */
  selectMatcher(expr: any): IValueMatcher | undefined {
    return createMatcherSelector(this.options).select(expr)
  }

  /**
   * Validate matcher
   * @param matcher
   * @param ctx
   */
  validateMatcher(matcher: any, ctx: any = {}): any {
    if (!matcher) {
      this.error('query: no matcher could be found for', ctx)
    }
  }

  /**
   * Default query property
   */
  get queryProp() {
    return 'matches'
  }

  /**
   * Normalize query
   *
   * A query of the form
   *   anyOf: ['x', 'y']
   * is normalized to
   *   name: 'anyOf'
   *   matchers: ['x', 'y']

   * @param query
   */
  normalizeQuery(query: any): IQuery {
    const matchers = query[this.queryProp] || query.matchers || []
    const name = query.name || this.queryProp
    return {
      name,
      matchers,
    }
  }

  /**
   * Query value
   * @param value
   * @returns { boolean } result of matching via matcher (or false if no matcher)
   */
  query(query: any, value?: any): boolean {
    return true
  }

  /**
   * matcher iterator function name
   */
  get matcherIterator() {
    return 'find'
  }

  /**
   * Runs matcher via query of the form:
   *   matchers: ['x', 'y']
   * @param query
   * @param value
   */
  match(query: any, value?: any): boolean {
    query = this.normalizeQuery(query)
    value = value || this.value
    const { matchers } = query
    // this.log('match', {
    //   query,
    //   value,
    //   matchers,
    // })
    const result = matchers[this.matcherIterator]((matchValue: any) => {
      return this.resolveMatchResult(matchValue, value)
    })
    return Boolean(result)
  }

  /**
   * Resolve match result via selected matcher
   * @param matchValue
   * @param value
   */
  resolveMatchResult(matchValue: any, value: any) {
    const matcher: IValueMatcher | undefined = this.selectMatcher(matchValue)
    if (!matcher) return false
    matcher.setQueryExpr(matchValue)
    const result = matcher.match(value)
    // this.log('resolveMatchResult', {
    //   value,
    //   matchValue,
    //   result,
    // })
    return result
  }
}
