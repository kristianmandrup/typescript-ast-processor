import * as ts from 'typescript'
import { ItemTester } from '../_item';

export class DecoratorTester extends ItemTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  test(item: any): boolean {
    return this.testName(item.name) && this.testType(item.type)
  }
}
