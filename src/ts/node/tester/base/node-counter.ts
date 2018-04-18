import { Loggable } from '../../../loggable'

/**
 * Factory to create query engine
 * @param options
 */
export function createNodeCounter(tester: any, options: any = {}) {
  return new NodeCounter(tester, options)
}

export class NodeCounter extends Loggable {
  tester: any
  occurrenceTester: any

  /**
   * Query node counter
   * @constructor
   * @param tester
   * @param options
   */
  constructor(tester: any, options: any = {}) {
    super(options)
    this.tester = tester
    this.occurrenceTester = tester.factory.occurrenceTester
  }

  /**
   * Count occurences in subtree
   * TODO: extract and use from utility class
   * @param options
   */
  countOccurrence(options: any = {}): number {
    return this.occurrenceTester.countOccurrence(options)
  }
}
