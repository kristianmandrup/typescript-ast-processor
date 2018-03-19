import * as ts from 'typescript'
import {
  enumKeys
} from '../util'

export class CheckModifier {
  has(node: ts.Node, modifier: any) {
    if (!node.modifiers) return
    return node.modifiers.find((modf: any) => modf.kind === modifier)
  }

  get modifiers() {
    return enumKeys(ts.SyntaxKind).map((key: string) => {
      return key.replace(/Keyword$/, '')
    })
  }

  isExported(node: any) {
    return this.has(node, ts.SyntaxKind.ExportKeyword)
  }

  isSubclass(node: any) {
    return this.has(node, ts.SyntaxKind.ExtendsKeyword)
  }

  isAbstract(node: any) {
    return this.has(node, ts.SyntaxKind.AbstractKeyword)
  }

  isPrivate(node: any) {
    return this.has(node, ts.SyntaxKind.PrivateKeyword)
  }

  isProtected(node: any) {
    return this.has(node, ts.SyntaxKind.ProtectedKeyword)
  }

  isPublic(node: any) {
    return this.has(node, ts.SyntaxKind.PublicKeyword)
  }

  isStatic(node: any) {
    return this.has(node, ts.SyntaxKind.StaticKeyword)
  }

  isAsync(node: any) {
    return this.has(node, ts.SyntaxKind.AsyncKeyword)
  }
}
