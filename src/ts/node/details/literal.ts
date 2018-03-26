import * as ts from 'typescript'
import { BaseDetailsTester } from './base';
import {
  enumKeys
} from '../../util'

export class LiteralTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  literalName(node: any) {
    const kind = node.kind || node
    return ts.SyntaxKind[ts.SyntaxKind[kind]]
  }

  has(node: any, literal: ts.SyntaxKind) {
    if (!node.type) return
    return Boolean(node.kind === literal)
  }

  get literal() {
    const has = this.has.bind(this)
    return {
      numeric(node: any) {
        return has(node, ts.SyntaxKind.NumericLiteral)
      },
      string(node: any) {
        return has(node, ts.SyntaxKind.StringLiteral)
      },
      null(node: any) {
        return has(node, ts.SyntaxKind.NullKeyword)
      },
      array(node: any) {
        return has(node, ts.SyntaxKind.ArrayLiteralExpression)
      },
      object(node: any) {
        return has(node, ts.SyntaxKind.ObjectLiteralExpression)
      }
    }
  }
}
