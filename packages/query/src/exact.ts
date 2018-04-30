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
  match(query: any, value?: any): boolean {
    query = this.normalizeQuery(query)
    value = value || this.value
    const { matchers } = query
    const result = this.resolveMatchResult(matchers, value)
    return Boolean(result)
  }
}
