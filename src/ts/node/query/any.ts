import { BaseNodeQuery } from './base'

export class AnyNodeQuery extends BaseNodeQuery {
  query(query: any) {
    return true
  }
}
