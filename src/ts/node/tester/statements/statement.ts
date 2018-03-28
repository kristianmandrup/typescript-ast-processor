import * as ts from 'typescript'
import { BaseTester } from '..';

export function createStatementTester(node: any, options: any) {
  return new StatementTester(node, options)
}

export class StatementTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  test(item: any): boolean {
    return true
  }
}
