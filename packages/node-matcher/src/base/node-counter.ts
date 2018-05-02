import { Loggable } from '../_loggable'

/**
 * Factory to create query engine
 * @param options
 */
export function createNodeCounter(tester: any, options: any = {}) {
  return new NodeCounter(tester, options)
}

export class NodeCounter extends Loggable {
  tester: any

  /**
   * Query node counter
   * @constructor
   * @param tester
   * @param options
   */
  constructor(tester: any, options: any = {}) {
    super(options)
    this.tester = tester
  }

  get occurrenceTester() {
    return this.tester.getTester('occurrence')
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
