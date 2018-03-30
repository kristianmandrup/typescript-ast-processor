import * as ts from 'typescript'
import { CaseClauseTester } from './case-clause';


export function isDefaultCaseClause(node: any) {
  return ts.isDefaultClause(node)
}

/**
 * Factory to create default case clause tester
 * @param node
 * @param options
 */
export function createDefaultCaseClauseTester(node: any, options: any = {}): DefaultCaseClauseTester {
  // if (!isDefaultCaseClause(node)) return
  return new DefaultCaseClauseTester(node, options)
}

/**
 * TODO: enough to subclass?
 */
export class DefaultCaseClauseTester extends CaseClauseTester {
  statements: any

  constructor(node: any, options: any) {
    super(node, options)
    this.statements = node.statements
    this.expression = this.statements[0]
  }

  // TODO ??
}
