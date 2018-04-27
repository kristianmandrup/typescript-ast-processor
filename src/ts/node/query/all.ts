import { BaseNodeQuery } from './base'

export class AllNodeQuery extends BaseNodeQuery {
  query(query: any) {
    return true
  }
}
