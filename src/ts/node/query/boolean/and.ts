import { BooleanQuery } from './base'

export function createAndQuery(options: any = {}) {
  return new AndQuery(options)
}

export class AndQuery extends BooleanQuery {
  /**
   * iterator
   */
  get iterator() {
    return 'every'
  }

  /**
   * query key
   */
  get queryKey(): string {
    return 'and'
  }
}
