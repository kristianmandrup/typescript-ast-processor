import * as ts from 'typescript'
import { BaseTester } from './base'
import { TypeTester } from '../details/type';

export function createTypeTester(node: any, options: any = {}) {
  return new TypeNodeTester(node, options)
}

export class TypeNodeTester extends BaseTester {
  typeTester: TypeTester

  constructor(node: any, options: any) {
    super(node, options)
    this.typeTester = new TypeTester(options)
  }

  /**
   * Get the type(s) that match for the node
   * Uses node details tester: TypeTester
   * TODO: can we return multiple types if union type or similar?
   */
  get typeName(): any {
    return this.typeTester.matches()
  }
}
