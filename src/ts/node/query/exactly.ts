import { BaseNodeQuery } from './base'

export class ExactlyNodeQuery extends BaseNodeQuery {
  query(query: any) {
    return true
  }
}
