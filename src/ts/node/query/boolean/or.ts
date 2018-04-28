import { BooleanQuery } from './base'

export function createOrQuery(options: any = {}) {
  return new OrQuery(options)
}

export class OrQuery extends BooleanQuery {
  /**
   * iterator for OR: find any match
   */
  get iterator() {
    return 'find'
  }

  /**
   * query key
   */
  get queryKey(): string {
    return 'or'
  }
}
