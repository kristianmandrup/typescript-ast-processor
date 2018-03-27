import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class FunctionTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get syntaxMap() {
    return {
      async: ts.SyntaxKind.AsyncKeyword,
      arrow: ts.SyntaxKind.ArrowFunction,
      generator: ts.SyntaxKind.AsteriskToken
    }
  }

  async(node?: any) {
    return this.has('async', { node })
  }

  arrow(node?: any) {
    return this.has('arrow', { node })
  }

  generator(node?: any) {
    this.has('generator', { node, modifierKey: 'asteriskToken' })
  }

  // generator(node?: any) {
  //   node = node || this.node
  //   return node.asteriskToken === ts.SyntaxKind.AsteriskToken
  // }
}
