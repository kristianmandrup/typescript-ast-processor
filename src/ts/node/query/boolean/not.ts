import { BooleanQuery } from './base'

export function createNotQuery(options: any = {}) {
  return new NotQuery(options)
}

export class NotQuery extends BooleanQuery {
  /**
   * query key
   */
  get queryKey(): string {
    return 'not'
  }

  /**
   *
   * @param query
   * @param tester
   */
  test(query: any, tester?: Function): boolean {
    query = this.validateQuery(query)
    const matcherFn = tester || this.tester
    const result = matcherFn(query)
    return !Boolean(result)
  }
}
