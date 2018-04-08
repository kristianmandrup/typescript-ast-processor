import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export function createIdentifierTester(options: any) {
  return new IdentifierTester(options)
}

export class IdentifierTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get syntaxMap() {
    return {
      exported: ts.SyntaxKind.ExportKeyword
    }
  }

  /**
   * Test if identifier node is exported
   * @param node identifier node to test
   */
  exported(node?: any) {
    return this.has('exported', { node })
  }
}
