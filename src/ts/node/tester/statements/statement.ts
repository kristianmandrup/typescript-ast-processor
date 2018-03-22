import * as ts from 'typescript'
import { ItemTester } from './_item';

export class StatementTester extends ItemTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  test(item: any): boolean {
    return true
  }
}
