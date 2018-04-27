import { BaseNodeQuery } from './base'
import { IValueMatcher } from './matcher'

export class ExactlyNodeQuery extends BaseNodeQuery {
  query(query: any) {
    return true
  }

  /**
   * Runs matcher via query of the form:
   *   matchers: ['x', 'y']
   * @param query
   * @param value
   */
  match(matcher: IValueMatcher, value?: any): boolean {
    return matcher.match(value)
  }
}
