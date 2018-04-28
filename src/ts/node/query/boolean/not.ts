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
}
