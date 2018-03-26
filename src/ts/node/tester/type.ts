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

  get typeName() {
    return this.typeTester.typeName
  }
}
