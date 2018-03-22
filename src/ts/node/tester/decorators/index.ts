import * as ts from 'typescript'
import { ListTester } from '../_list'
import { DecoratorTester } from './decorator';

export class DecoratorsTester extends ListTester {
  constructor(node: any, options: any) {
    super(node, options)
    this.item = new DecoratorTester(node, options)
  }
}
