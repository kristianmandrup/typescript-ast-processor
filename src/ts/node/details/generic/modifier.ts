import * as ts from 'typescript'
import {
  enumKeys
} from '../../../util'
import { BaseDetailsTester } from '../base';

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

  get class() {
    const has = this.has.bind(this)
    return {
      subclass(node: any) {
        return has(node, ts.SyntaxKind.ExtendsKeyword)
      },
      // alias
      extends(node: any) {
        return has(node, ts.SyntaxKind.ExtendsKeyword)
      },
      implements(node: any) {
        return has(node, ts.SyntaxKind.ImplementsKeyword)
      },
      abstract(node: any) {
        return has(node, ts.SyntaxKind.AbstractKeyword)
      },
    }
  }

  get access() {
    const has = this.has.bind(this)
    return {
      private(node: any) {
        return has(node, ts.SyntaxKind.PrivateKeyword)
      },
      protected(node: any) {
        return has(node, ts.SyntaxKind.ProtectedKeyword)
      },
      public(node: any) {
        return has(node, ts.SyntaxKind.PublicKeyword)
      },
      static(node: any) {
        return has(node, ts.SyntaxKind.StaticKeyword)
      }
    }
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

  get call() {
    const has = this.has.bind(this)
    return {
      isAwait(node: any) {
        return has(node, ts.SyntaxKind.ArrowFunction)
      },
    }
  }

  get function() {
    const has = this.has.bind(this)
    return {
      isAsync(node: any) {
        return has(node, ts.SyntaxKind.AsyncKeyword)
      },
      isArrow(node: any) {
        return has(node, ts.SyntaxKind.ArrowFunction)
      }
    }
  }

  get identifier() {
    const has = this.has.bind(this)
    return {
      exported(node: any) {
        return has(node, ts.SyntaxKind.ExportKeyword)
      }
    }
  }

  get checkers() {
    return {
      ...this.class,
      ...this.call,
      ...this.function,
      ...this.identifier
    }
  }
}
