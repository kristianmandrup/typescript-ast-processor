import * as ts from 'typescript'
import {
  enumKeys
} from '../../util'
import { BaseDetailsTester } from './base';

export class CheckModifier extends BaseDetailsTester {
  has(node: ts.Node, modifier: any) {
    if (!node.modifiers) return
    return node.modifiers.find((modf: any) => modf.kind === modifier)
  }

  get modifiers() {
    return enumKeys(ts.SyntaxKind).map((key: string) => {
      return key.replace(/Keyword$/, '')
    })
  }

  get checkers() {
    const has = this.has.bind(this)
    return {
      isExported(node: any) {
        return has(node, ts.SyntaxKind.ExportKeyword)
      },
      isSubclass(node: any) {
        return has(node, ts.SyntaxKind.ExtendsKeyword)
      },
      // alias
      isExtends(node: any) {
        return has(node, ts.SyntaxKind.ExtendsKeyword)
      },
      isAbstract(node: any) {
        return has(node, ts.SyntaxKind.AbstractKeyword)
      },
      isPrivate(node: any) {
        return has(node, ts.SyntaxKind.PrivateKeyword)
      },
      isProtected(node: any) {
        return has(node, ts.SyntaxKind.ProtectedKeyword)
      },
      isPublic(node: any) {
        return has(node, ts.SyntaxKind.PublicKeyword)
      },
      isStatic(node: any) {
        return has(node, ts.SyntaxKind.StaticKeyword)
      },
      isAsync(node: any) {
        return has(node, ts.SyntaxKind.AsyncKeyword)
      },
      isImplements(node: any) {
        return has(node, ts.SyntaxKind.ImplementsKeyword)
      },
      isVoid(node: any) {
        return has(node, ts.SyntaxKind.VoidKeyword)
      },
      isString(node: any) {
        return has(node, ts.SyntaxKind.StringKeyword)
      },
      isNumber(node: any) {
        return has(node, ts.SyntaxKind.NumberKeyword)
      },
      isSymbol(node: any) {
        return has(node, ts.SyntaxKind.SymbolKeyword)
      },
      isArray(node: any) {
        return has(node, ts.SyntaxKind.ArrayType)
      },
      isUnion(node: any) {
        return has(node, ts.SyntaxKind.UnionType)
      },
      isArrow(node: any) {
        return has(node, ts.SyntaxKind.ArrowFunction)
      },
      isAwait(node: any) {
        return has(node, ts.SyntaxKind.ArrowFunction)
      },
      isBoolean(node: any) {
        return has(node, ts.SyntaxKind.BooleanKeyword)
      }
    }
  }
}
