import { BaseQueryMatcher } from './base'

export function createAnyQueryMatcher(options: any = {}) {
  return new AnyQueryMatcher(options)
}

export class AnyQueryMatcher extends BaseQueryMatcher {
  get matcherIterator() {
    return 'find'
  }
}
