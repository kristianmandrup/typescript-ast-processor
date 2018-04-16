import { Loggable } from '../../../loggable'

/**
 * Factory to create query engine
 * @param options
 */
export function createNodeCounter(tester: any, options: any = {}) {
  return new QueryNodeCounter(tester, options)
}

export class QueryNodeCounter extends Loggable {
  tester: any
  occurrenceTester: any

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
