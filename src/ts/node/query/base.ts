import { Loggable } from '../../loggable'
import { IValueMatcher, createMatcherSelector } from './matcher'
import { isFunction } from 'util'

export interface IQuery {
  name: string
  matchers: any[]
}

export class BaseNodeQuery extends Loggable {
  node: any
  value: any

  constructor(node: any, options: any = {}) {
    super(options)
    this.node = node
    this.init()
  }

  /**
   * Initialize
   */
  init(): BaseNodeQuery {
    const { options, node } = this
    const { key, value } = options
    if (key) this.setKey(key)
    const testValue = isFunction(value) ? value(node) : value
    if (testValue) this.setValue(testValue)
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
  setValue(value: any): BaseNodeQuery {
    this.value = this.validateValue(value)
    return this
  }

  /**
   * Set key for node to be used to determine value to be used for query
   * @param value
   */
  setKey(key: any): BaseNodeQuery {
    this.setValue(this.node[key])
    return this
  }

  /**
   * Select matcher to be used for query, based on type of value
   * @param value
   */
  selectMatcher(value?: any): IValueMatcher | undefined {
    value = value || this.value
    return createMatcherSelector(this.options).select(this.value)
  }

  validateMatcher(matcher: any, ctx: any): any {
    if (!matcher) {
      this.error('query: no matcher could be found for', ctx)
    }
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
    return query
  }

  /**
   * Query value
   * @param value
   * @returns { boolean } result of matching via matcher (or false if no matcher)
   */
  query(query: any, value?: any): boolean {
    query = this.normalizeQuery(query)
    const matcher = this.selectMatcher(value)
    this.validateMatcher(matcher, {
      value,
      query,
    })
    // TODO: fix args...
    return matcher ? matcher.match(query) : false
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
  match(matchers: IValueMatcher | IValueMatcher[], value?: any): boolean {
    return matchers[this.matcherIterator]((matcher: IValueMatcher) => {
      return matcher.match(value)
    })
  }
}
