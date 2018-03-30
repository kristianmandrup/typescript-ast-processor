import * as ts from 'typescript'
import { BaseNodeTester } from '../../../base';
import { createCaseBlockTester, CaseBlockTester } from './case-block';

export function isSwitchStatement(node: any) {
  return ts.isSwitchStatement(node)
}

export function createSwitchStatementTester(node: any, options: any = {}) {
  if (!isSwitchStatement(node)) return
  return new SwitchStatementTester(node, options)
}

export class SwitchStatementTester extends BaseNodeTester {
  caseBlockTester: CaseBlockTester

  constructor(node: any, options: any) {
    super(node, options)
    this.caseBlockTester = createCaseBlockTester(node.caseBlock, options)
  }

  get hasDefault() {
    return Boolean(this.caseBlockTester.defaultCase)
  }

  get caseCount(): number {
    return this.caseBlockTester.clauseIds.length
  }

  /**
   * Get basic info including else on/off and nested levels
   */
  info() {
    return {
      ...super.info(),
      conditionalType: 'switch',
      cases: this.caseCount,
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
