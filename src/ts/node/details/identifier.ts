import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class IdentifierTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  exported(node?: any) {
    return this.has(ts.SyntaxKind.ExportKeyword, { node })
  }
}
