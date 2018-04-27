import { Loggable } from '../../../loggable'

interface IBooleanQuery {}

export class BooleanQuery extends Loggable implements IBooleanQuery {
  tester: any

  constructor(options: any = {}, tester?: Function) {
    super(options)
    this.tester = tester || options.tester
  }

  /**
   * By default return true if no query passes, otherwise false
   * @param query
   * @param tester
   */
  query(query: any, tester?: Function) {
    return !query
  }
}
