import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class FunctionTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  async(node: any) {
    return this.has(node, ts.SyntaxKind.AsyncKeyword)
  }

  arrow(node: any) {
    return this.has(node, ts.SyntaxKind.ArrowFunction)
  }

  generator(node?: any) {
    node = node || this.node
    return node.asteriskToken === ts.SyntaxKind.AsteriskToken
  }
}
