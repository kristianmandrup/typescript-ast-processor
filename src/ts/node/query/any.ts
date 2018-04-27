import { BaseQueryMatcher } from './base'

export function createAnyQueryMatcher(options: any = {}) {
  return new AnyQueryMatcher(options)
}

export class AnyQueryMatcher extends BaseQueryMatcher {
  get queryProp() {
    return 'anyOf'
  }

  get matcherIterator() {
    return 'find'
  }
}
