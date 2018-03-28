import * as ts from 'typescript'
import { BaseTester } from '../../..';


export function isCaseClause(node: any) {
  return ts.isCaseClause(node)
}

export function createCaseClauseTester(node: any, options: any = {}): CaseClauseTester {
  // if (!isCaseClause(node)) return
  return new CaseClauseTester(node, options)
}


export class CaseClauseTester extends BaseTester {
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
