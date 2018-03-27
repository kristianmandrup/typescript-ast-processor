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

  /**
   * Test if function (like) node is an async function
   * @param node function node to test
   */
  async(node?: any) {
    return this.has('async', { node })
  }

  /**
   * Test if function (like) node is an arrow function
   * @param node function node to test
   */
  arrow(node?: any) {
    return this.has('arrow', { node })
  }

  /**
   * Test if function (like) node is a generator function
   * @param node function node to test
   */
  generator(node?: any) {
    this.has('generator', { node, modifierKey: 'asteriskToken' })
  }

  // generator(node?: any) {
  //   node = node || this.node
  //   return node.asteriskToken === ts.SyntaxKind.AsteriskToken
  // }
}
