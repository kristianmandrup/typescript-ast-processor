import { BaseQueryMatcher } from './base'
import { IValueMatcher } from './matcher'

export function createExactQueryMatcher(options: any = {}) {
  return new ExactQueryMatcher(options)
}

export class ExactQueryMatcher extends BaseQueryMatcher {
  get queryProp() {
    return 'exactly'
  }

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
