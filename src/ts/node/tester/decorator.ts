import * as ts from 'typescript'
import { BaseTester } from './base'

export class DecoratorTester extends BaseTester {
  constructor(options: any) {
    super(options)
  }

  test(decorator: any) {
    const { name, type } = decorator
    return true
  }
}
