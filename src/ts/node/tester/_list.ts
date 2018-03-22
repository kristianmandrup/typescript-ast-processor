import * as ts from 'typescript'
import { BaseTester } from './base'

export interface IItemTester {
  test(item: any): boolean
}

export class ListTester extends BaseTester {
  item: IItemTester

  constructor(node: any, options: any) {
    super(node, options)
  }

  test(decorators: any) {
    const {
      list
    } = decorators
    const method = list.for == 'any' ? 'find' : 'every'
    return list.items[method]((item: any) => this.item.test(item))
  }
}
