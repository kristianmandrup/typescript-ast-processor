import { Loggable } from '../../loggable'

export class BaseNodeQuery extends Loggable {
  node: any

  constructor(node: any, options: any = {}) {
    super(options)
    this.node = node
  }

  query(query: any) {
    return true
  }
}
