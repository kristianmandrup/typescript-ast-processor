import * as ts from 'typescript'
import { BaseTester } from './base'
import { DecoratorTester } from './decorator';

export class DecoratorsTester extends BaseTester {
  decorator: DecoratorTester

  constructor(node: any, options: any) {
    super(node, options)
    this.decorator = new DecoratorTester(node, options)
  }

  test(decorators: any) {
    const {
      list
    } = decorators
    const method = list.for == 'one' ? 'find' : 'every'
    return list.items[method]((decorator: any) => this.decorator.test(decorator))
  }
}
