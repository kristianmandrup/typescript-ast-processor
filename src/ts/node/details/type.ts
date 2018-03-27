import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class TypeTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  void(node: any) {
    return this.has(ts.SyntaxKind.VoidKeyword, { node })
  }

  string(node: any) {
    return this.has(ts.SyntaxKind.StringKeyword, { node })
  }

  number(node: any) {
    return this.has(ts.SyntaxKind.NumberKeyword, { node })
  }

  symbol(node: any) {
    return this.has(ts.SyntaxKind.SymbolKeyword, { node })
  }

  array(node: any) {
    return this.has(ts.SyntaxKind.ArrayType, { node })
  }

  union(node: any) {
    return this.has(ts.SyntaxKind.UnionType, { node })
  }

  boolean(node: any) {
    return this.has(ts.SyntaxKind.BooleanKeyword, { node })
  }

  any(node: any) {
    return this.has(ts.SyntaxKind.AnyKeyword, { node })
  }
}
