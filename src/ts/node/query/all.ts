import { BaseQueryMatcher } from './base'

export function createAllQueryMatcher(options: any = {}) {
  return new AllQueryMatcher(options)
}

export class AllQueryMatcher extends BaseQueryMatcher {
  get matcherIterator() {
    return 'every'
  }
}
