import * as ts from 'typescript'
import { BaseTester } from '../../../base';

import {
  createCaseClauseTester
} from './case-clause'

export function isCaseBlock(node: any) {
  return ts.isCaseBlock(node)
}

export function createCaseBlockTester(node: any, options: any = {}) {
  if (!isCaseBlock(node)) return
  return new CaseBlockTester(node, options)
}


export class CaseBlockTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  createClauseTester(node: ts.CaseClause, options: any = {}) {
    return createCaseClauseTester(node, options)
  }

  clauseInfo(clause: ts.CaseClause): any {
    return this.createClauseTester(clause).info()
  }

  get clausesInfo() {
    return this.clauseNodes.map(this.clauseInfo)
  }

  get clauseIds() {
    return this.clausesInfo.map((info: any) => info.name)
  }

  get clauseNodes(): ts.CaseClause[] {
    return this.node.clauses.filter((clause: ts.CaseClause) => ts.isCaseClause(clause))
  }

  get defaultClauseNode(): ts.DefaultClause {
    return this.node.clauses.filter((clause: ts.CaseClause) => ts.isDefaultClause(clause))
  }

  get caseIds() {
    return this.clauseIds
  }

  get caseCount() {
    return this.clauseNodes.length
  }

  get defaultCase() {
    // this.createDefaultClauseTester
    return this.defaultClauseNode
  }

  info() {
    return {
      cases: {
        ids: this.caseIds,
        count: this.caseCount
      },
      default: Boolean(this.defaultCase)
    }
  }

  test(query: any) {
    this.testCaseCount(query.cases)
  }

  testCaseCount(query: any) {
    return this.testCount(query, this.caseCount)
  }
}
