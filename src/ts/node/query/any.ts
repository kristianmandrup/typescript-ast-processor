import { BaseNodeQuery } from './base'

export class AnyNodeQuery extends BaseNodeQuery {
  get matcherIterator() {
    return 'find'
  }
}
