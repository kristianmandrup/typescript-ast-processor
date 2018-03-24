import * as ts from 'typescript'
import { BaseTester } from './base'

export function createTypeTester(node: any, options: any = {}) {
  return new TypeTester(node, options)
}

export class TypeTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  test(type: any) {
    return true
  }
}
