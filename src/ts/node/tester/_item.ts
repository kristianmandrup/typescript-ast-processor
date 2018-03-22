import * as ts from 'typescript'
import { BaseTester } from './base'

export interface IItemTester {
  test(item: any): boolean
}

export class ItemTester extends BaseTester implements IItemTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  test(item: any): boolean {
    return true
  }
}
