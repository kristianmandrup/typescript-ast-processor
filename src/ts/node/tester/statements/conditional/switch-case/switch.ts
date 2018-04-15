import * as ts from 'typescript'
import { BaseNodeTester, INodeTester } from '../../../base'
import { ICaseBlockTester } from './case-block'

export function isSwitchStatement(node: any) {
  return ts.isSwitchStatement(node)
}

export function createSwitchStatementTester(node: any, options: any = {}) {
  if (!isSwitchStatement(node)) return
  return new SwitchStatementTester(node, options)
}

export class SwitchStatementTester extends BaseNodeTester {
  caseBlockTester: ICaseBlockTester

  constructor(node: any, options: any) {
    super(node, options)
    this.caseBlockTester = this.createCaseBlockTester(
      node.caseBlock,
      options,
    ) as ICaseBlockTester
  }

  /**
   * Create a case clause block tester
   * @param node
   * @param options
   */
  createCaseBlockTester(node: any, options: any): INodeTester {
    return this.createNodeTester('case.block', node, options) // as CaseBlockTester
  }

  /**
   * Whether switch has default case clause
   */
  get hasDefault() {
    return Boolean(this.caseBlockTester.defaultCase)
  }

  /**
   * Number of case clauses
   */
  get caseCount(): number {
    return this.caseBlockTester.clauseKeys.length
  }

  /**
   * Full info of case clauses
   */
  get caseClausesInfo(): any[] {
    return this.caseBlockTester.clausesInfo
  }

  /**
   * Keys of case clauses
   */
  get caseClausesKeys(): string[] {
    return this.caseBlockTester.clauseKeys
  }

  /**
   * Return cases info
   */
  get cases() {
    return {
      count: this.caseCount,
      keys: this.caseClausesKeys,
      clauses: this.caseClausesInfo,
    }
  }

  /**
   * Get basic info including else on/off and nested levels
   */
  info() {
    return {
      ...super.info(),
      conditionalType: 'switch',
      cases: this.cases,
      defaultCase: this.hasDefault,
    }
  }

  test(query: any) {
    return this.testCaseBlock(query.cases)
  }

  testCaseBlock(query: any) {
    if (!query) return true
    return this.caseBlockTester ? this.caseBlockTester.test(query) : false
  }
}
