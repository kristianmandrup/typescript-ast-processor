import * as ts from 'typescript'
import { BaseNodeTester, INodeTester } from '../../../base';

export function isSwitchStatement(node: any) {
  return ts.isSwitchStatement(node)
}

export function createSwitchStatementTester(node: any, options: any = {}) {
  if (!isSwitchStatement(node)) return
  return new SwitchStatementTester(node, options)
}

export class SwitchStatementTester extends BaseNodeTester {
  caseBlockTester: INodeTester // CaseBlockTester

  constructor(node: any, options: any) {
    super(node, options)
    this.caseBlockTester = this.createCaseBlockTester(node.caseBlock, options)
  }

  createCaseBlockTester(node: any, options: any): INodeTester {
    return this.createNodeTester('case.block', node, options) // as CaseBlockTester
  }

  get hasDefault() {
    return Boolean(this.caseBlockTester.defaultCase)
  }

  get caseCount(): number {
    return this.caseBlockTester.clauseKeys.length
  }

  get caseClausesInfo(): any[] {
    return this.caseBlockTester.clausesInfo
  }

  get caseClausesKeys(): string[] {
    return this.caseBlockTester.clauseKeys
  }

  /**
   * Get basic info including else on/off and nested levels
   */
  info() {
    return {
      ...super.info(),
      conditionalType: 'switch',
      cases: {
        count: this.caseCount,
        keys: this.caseClausesKeys,
        clauses: this.caseClausesInfo,
      },
      defaultCase: this.hasDefault
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
