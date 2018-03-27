import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class IdentifierTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get syntaxMap() {
    return {
      export: ts.SyntaxKind.ExportKeyword
    }
  }

  exported(node?: any) {
    return this.has('export', { node })
  }
}
