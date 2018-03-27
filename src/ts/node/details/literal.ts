import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class LiteralTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get syntaxMap() {
    return {
      number: ts.SyntaxKind.NumericLiteral,
      string: ts.SyntaxKind.StringLiteral,
      null: ts.SyntaxKind.NullKeyword,
      array: ts.SyntaxKind.ArrayLiteralExpression,
      object: ts.SyntaxKind.ObjectLiteralExpression
    }
  }

  numeric(node?: any) {
    return this.has('number', { node })
  }
  string(node?: any) {
    return this.has('string', { node })
  }
  null(node?: any) {
    return this.has('null', { node })
  }
  array(node?: any) {
    return this.has('array', { node })
  }
  object(node?: any) {
    return this.has('object', { node })
  }
}
