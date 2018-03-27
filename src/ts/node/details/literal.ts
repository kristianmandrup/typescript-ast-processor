import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class LiteralTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  numeric(node?: any) {
    return this.has(ts.SyntaxKind.NumericLiteral, { node })
  }
  string(node?: any) {
    return this.has(ts.SyntaxKind.StringLiteral, { node })
  }
  null(node?: any) {
    return this.has(ts.SyntaxKind.NullKeyword, { node })
  }
  array(node?: any) {
    return this.has(ts.SyntaxKind.ArrayLiteralExpression, { node })
  }
  object(node?: any) {
    return this.has(ts.SyntaxKind.ObjectLiteralExpression, { node })
  }
}
