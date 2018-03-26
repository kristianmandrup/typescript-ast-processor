import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class TypeTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.checkers = this.type
  }

  has(node: any, type: ts.SyntaxKind) {
    if (!node.type) return
    return Boolean(node.type === type)
  }

  typeName(node: any) {
    const type = node.type || node
    return ts.SyntaxKind[ts.SyntaxKind[type]]
  }

  get type() {
    const has = this.has.bind(this)
    return {
      void(node: any) {
        return has(node, ts.SyntaxKind.VoidKeyword)
      },
      string(node: any) {
        return has(node, ts.SyntaxKind.StringKeyword)
      },
      number(node: any) {
        return has(node, ts.SyntaxKind.NumberKeyword)
      },
      symbol(node: any) {
        return has(node, ts.SyntaxKind.SymbolKeyword)
      },
      array(node: any) {
        return has(node, ts.SyntaxKind.ArrayType)
      },
      union(node: any) {
        return has(node, ts.SyntaxKind.UnionType)
      },
      boolean(node: any) {
        return has(node, ts.SyntaxKind.BooleanKeyword)
      },
      any(node: any) {
        return has(node, ts.SyntaxKind.AnyKeyword)
      },

    }
  }
}
