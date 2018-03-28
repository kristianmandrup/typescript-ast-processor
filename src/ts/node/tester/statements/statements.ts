import * as ts from 'typescript'
import { ListTester } from '../generic'
import { createStatementTester } from './statement';

export class StatementsTester extends ListTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  createStatementTester(node: any, options: any) {
    return createStatementTester(node, options)
  }
}
