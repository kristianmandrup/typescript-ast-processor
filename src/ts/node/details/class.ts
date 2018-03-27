import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class ClassDetailsTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get syntaxMap() {
    return {
      extends: ts.SyntaxKind.ExtendsKeyword,
      implements: ts.SyntaxKind.ImplementsKeyword,
      abstract: ts.SyntaxKind.AbstractKeyword
    }
  }

  // alias
  subclass(node?: any) {
    return this.has('extends', { node })
  }

  extends(node?: any) {
    return this.subclass(node)
  }

  implements(node?: any) {
    return this.has('implements', { node })
  }

  abstract(node?: any) {
    return this.has('abstract', { node })
  }
}
