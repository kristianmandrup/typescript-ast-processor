import { BooleanQuery } from './base'

export function createAndQuery(options: any = {}) {
  return new AndQuery(options)
}

export class AndQuery extends BooleanQuery {
  get iterator() {
    return 'every'
  }

  /**
   *
   * @param query
   * @param tester
   */
  test(query: any, tester?: Function): boolean {
    if (!super.query(query)) return false
    const matcherFn = tester || this.tester
    return query.and
      ? this.combinedLogic(query.and, matcherFn)
      : matcherFn(query)
  }
}
