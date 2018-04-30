import { BaseQueryMatcher, IQueryMatcher } from './base'
import { createAndQuery } from './boolean'

export function createGenericQuery(options: any = {}) {
  return new GenericQuery(options)
}

/**
 * Executes a generic query simply by using the and query
 */
export class GenericQuery extends BaseQueryMatcher {
  $query: any

  /**
   * Initialize
   */
  init(): IQueryMatcher {
    super.init()
    this.$query = createAndQuery(this.options)
    return this
  }

  /**
   *
   * @param query
   * @param value
   */
  match(query: any, value?: any): boolean {
    value = value || this.value
    return this.$query.match(query, value)
  }

  /**
   * Query value
   * @param value
   * @returns { boolean } result of matching via matcher (or false if no matcher)
   */
  query(query: any, value?: any): boolean {
    value = value || this.value
    return this.$query.query(query, value)
  }
}
