import { BaseNodeQuery } from './base'

export class AllNodeQuery extends BaseNodeQuery {
  get matcherIterator() {
    return 'every'
  }
}
