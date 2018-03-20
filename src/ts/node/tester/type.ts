import * as ts from 'typescript'
import { BaseTester } from './base'

export class TypeTester extends BaseTester {
  constructor(options: any) {
    super(options)
  }

  test(type: any) {
    return true
  }
}
