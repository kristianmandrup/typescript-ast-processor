import * as ts from 'typescript'
import { BaseTester } from '../../../base';
import { createCaseBlockTester, CaseBlockTester } from './case-block';

export function isSwitchStatement(node: any) {
  return ts.isSwitchStatement(node)
}

export function createSwitchStatementTester(node: any, options: any = {}) {
  if (!isSwitchStatement(node)) return
  return new SwitchStatementTester(node, options)
}

export class SwitchStatementTester extends BaseTester {
  caseBlockTester: CaseBlockTester | undefined

  constructor(node: any, options: any) {
    super(node, options)
    this.caseBlockTester = createCaseBlockTester(node.caseBlock, options)
  }

  test(query: any) {
    return this.testCaseBlock(query.cases)
  }

  testCaseBlock(query: any) {
    if (!query) return true
    return this.caseBlockTester ? this.caseBlockTester.test(query) : false
  }
}
