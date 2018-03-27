import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class TypeTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get syntaxMap() {
    return {
      void: ts.SyntaxKind.VoidKeyword,
      string: ts.SyntaxKind.StringKeyword,
      number: ts.SyntaxKind.NumberKeyword,
      symbol: ts.SyntaxKind.SymbolKeyword,
      array: ts.SyntaxKind.ArrayType,
      union: ts.SyntaxKind.UnionType,
      boolean: ts.SyntaxKind.BooleanKeyword,
      any: ts.SyntaxKind.AnyKeyword
    }
  }

  void(node: any) {
    return this.has('void', { node })
  }

  string(node: any) {
    return this.has('string', { node })
  }

  number(node: any) {
    return this.has('number', { node })
  }

  symbol(node: any) {
    return this.has('symbol', { node })
  }

  array(node: any) {
    return this.has('array', { node })
  }

  union(node: any) {
    return this.has('union', { node })
  }

  boolean(node: any) {
    return this.has('boolean', { node })
  }

  any(node: any) {
    return this.has('any', { node })
  }
}
