import { BooleanQuery } from './base'

export function createNotQuery(options: any = {}) {
  return new NotQuery(options)
}

export class NotQuery extends BooleanQuery {
  query(query: any, tester?: Function) {
    const matcherFn = tester || this.tester
    if (!query) return true
    return query.not ? !Boolean(matcherFn(query.not)) : matcherFn(query)
  }
}
