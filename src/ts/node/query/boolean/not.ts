import { BooleanQuery } from './base'

export function createNotQuery(options: any = {}) {
  return new NotQuery(options)
}

export class NotQuery extends BooleanQuery {
  query(query: any, tester?: Function) {
    if (!super.query(query)) return false
    const matcherFn = tester || this.tester
    return query.not ? !Boolean(matcherFn(query.not)) : matcherFn(query)
  }
}
