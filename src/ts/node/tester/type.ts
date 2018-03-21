import * as ts from 'typescript'
import { BaseTester } from './base'

export class TypeTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  test(type: any) {
    return true
  }
}
