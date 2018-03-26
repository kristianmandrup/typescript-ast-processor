import * as ts from 'typescript'
import {
  enumKeys
} from '../../../util'
import { BaseDetailsTester } from '../base';

export class CheckModifier extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.checkers = {
      ...this.class,
      ...this.call,
      ...this.function,
      ...this.identifier
    }
  }

  has(node: ts.Node, modifier: any) {
    if (!node.modifiers) return
    return Boolean(node.modifiers.find((modf: any) => modf.kind === modifier))
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

  get node() {
    const has = this.has.bind(this)
    return {
      identifier(node: any) {
        return has(node, ts.SyntaxKind.Identifier)
      }
    }
  }

  get argument() {
    return {
      ...this.node,
      ...this.function
    }
  }

  get call() {
    const has = this.has.bind(this)
    return {
      await(node: any) {
        return has(node, ts.SyntaxKind.ArrowFunction)
      },
    }
  }

  get function() {
    const has = this.has.bind(this)
    return {
      async(node: any) {
        return has(node, ts.SyntaxKind.AsyncKeyword)
      },
      arrow(node: any) {
        return has(node, ts.SyntaxKind.ArrowFunction)
      }
    }
  }

  get conditional() {
    const has = this.has.bind(this)
    return {
      if(node: any) {
        return has(node, ts.SyntaxKind.IfKeyword)
      },
      else(node: any) {
        return has(node, ts.SyntaxKind.ElseKeyword)
      },
      switch(node: any) {
        return has(node, ts.SyntaxKind.SwitchKeyword)
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
}
