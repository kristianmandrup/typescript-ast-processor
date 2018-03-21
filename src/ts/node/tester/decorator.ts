import * as ts from 'typescript'
import { BaseTester } from './base'

export class DecoratorTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  test(decorator: any) {
    const { name, type } = decorator
    return true
  }
}
