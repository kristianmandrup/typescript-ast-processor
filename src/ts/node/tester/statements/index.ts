import * as ts from 'typescript'
import { ListTester } from '../_list'
import { StatementTester } from './statement';

export class StatementsTester extends ListTester {
  constructor(node: any, options: any) {
    super(node, options)
    this.item = new StatementTester(node, options)
  }
}
