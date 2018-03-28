import * as ts from 'typescript'
import { BaseTester } from '..';

/**
 * Factory to create a statement tester
 * @param node
 * @param options
 */
export function createStatementTester(node: any, options: any) {
  return new StatementTester(node, options)
}

/**
 * Generic statement tester
 * TODO: Call the relevant statement tester that matches the particular type of statement (if available)
 */
export class StatementTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   *  * TODO: Call the relevant statement tester that matches the particular type of statement (if available)
   * @param query
   */
  test(query: any): any {
    return true
  }
}
