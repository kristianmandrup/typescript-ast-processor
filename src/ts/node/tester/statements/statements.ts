import { ListTester } from '../generic'
import { createStatementTester } from './statement';

/**
 * Factory to create a statement tester
 * @param node
 * @param options
 */
export function createStatementsTester(node: any, options: any) {
  return new StatementsTester(node, options)
}

export class StatementsTester extends ListTester {
  statements: any[]

  constructor(node: any, options: any) {
    super(node, options)
    this.statements = node.statements || node.parent.statements || node
  }

  createStatementTester(node: any, options: any) {
    return createStatementTester(node, options)
  }

  get statementCount() {
    return this.statements.length
  }

  info() {
    return {
      count: this.statementCount
    }
  }

  /**
   * Example:
   * {
   *   count: {
   *     min: 2
   *     max: 5
   *   }
   * }
   * @param query
   */
  test(query: any) {
    query = query.count || query
    return this.testCount(query, this.statementCount)
  }

  testStatement(query: any) {
    return false
  }
}
