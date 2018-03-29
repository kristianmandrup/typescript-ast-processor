import * as ts from 'typescript'
import { BaseNodeTester } from '../../../base';


export function isCaseClause(node: any) {
  return ts.isCaseClause(node)
}

export function createCaseClauseTester(node: any, options: any = {}): CaseClauseTester {
  // if (!isCaseClause(node)) return
  return new CaseClauseTester(node, options)
}


export class CaseClauseTester extends BaseNodeTester {
  expression: any

  constructor(node: any, options: any) {
    super(node, options)
    this.expression = node.expression
  }

  get name() {
    return ts.isLiteralExpression(this.expression) ? this.expression.getText() : 'unknown'
  }

  info() {
    return {
      name: this.name
    }
  }
}
