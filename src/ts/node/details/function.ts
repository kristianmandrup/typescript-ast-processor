import * as ts from 'typescript'
import { CheckModifier } from './generic'
import { BaseDetailsTester } from './base';

export class FunctionTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.checkers = this.function
  }

  has(node: any, type: ts.SyntaxKind) {
    if (!node.type) return
    return Boolean(node.type === type)
  }

  get function() {
    const has = this.has.bind(this)
    return {
      async(node: any) {
        return has(node, ts.SyntaxKind.AsyncKeyword)
      },
      arrow(node: any) {
        return has(node, ts.SyntaxKind.ArrowFunction)
      },
      generator(node: any) {
        return node.asteriskToken === ts.SyntaxKind.AsteriskToken
      }
    }
  }

}
