import * as ts from 'typescript'
import { BaseNodeTester, INodeTester } from '../../../base'

export function isCaseBlock(node: any) {
  return ts.isCaseBlock(node)
}

export function createCaseBlockTester(node: any, options: any = {}) {
  // if (!isCaseBlock(node)) return
  return new CaseBlockTester(node, options)
}

export interface ICaseBlockTester extends INodeTester {
  defaultCase: string
  clauseKeys: string[]
  clausesInfo: any
}

export class CaseBlockTester extends BaseNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Create case clause tester
   * @param node
   * @param options
   */
  createClauseTester(node: ts.CaseClause, options: any = {}) {
    return this.createNodeTester('case.clause', node, options)
  }

  /**
   * Get info of a single case clause
   * @param clause
   */
  clauseInfo(clause: ts.CaseClause): any {
    return this.createClauseTester(clause).info()
  }

  /**
   * Get info for all case clauses
   */
  get clausesInfo() {
    return this.clauseNodes.map(this.clauseInfo)
  }

  /**
   * Get keys of all case clauses
   */
  get clauseKeys() {
    return this.clausesInfo.map((info: any) => info.name)
  }

  /**
   * Get case clause nodes
   */
  get clauseNodes(): ts.CaseClause[] {
    return this.node.clauses.filter((clause: ts.CaseClause) =>
      ts.isCaseClause(clause),
    )
  }

  /**
   * Get default case clause node
   */
  get defaultClauseNode(): ts.DefaultClause {
    return this.node.clauses.filter((clause: ts.CaseClause) =>
      ts.isDefaultClause(clause),
    )
  }

  /**
   * Get number of case clause nodes
   */
  get caseCount() {
    return this.clauseNodes.length
  }

  /**
   * Get default case clause node
   */
  get defaultCase() {
    // this.createDefaultClauseTester
    return this.defaultClauseNode
  }

  /**
   * Whether case block has a default clause
   */
  get hasDefaultCase() {
    // this.createDefaultClauseTester
    return Boolean(this.defaultClauseNode)
  }

  get cases() {
    return {
      keys: this.clauseKeys,
      count: this.caseCount,
    }
  }

  /**
   * Get node info
   * - cases
   * - default
   */
  info() {
    return {
      cases: this.cases,
      default: this.hasDefaultCase,
    }
  }

  /**
   * Match node via query
   * TODO: test case causes in detail
   * @param query
   */
  test(query: any) {
    this.testCaseCount(query.cases)
  }

  /**
   * Test if number of cases matches query
   * @param query
   */
  testCaseCount(query: any) {
    return this.testCount(query, this.caseCount)
  }
}
