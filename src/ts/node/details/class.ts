import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class ClassDetailsTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  // alias
  subclass(node?: any) {
    return this.has(ts.SyntaxKind.ExtendsKeyword, { node })
  }

  extends(node?: any) {
    return this.subclass(node)
  }

  implements(node?: any) {
    return this.has(ts.SyntaxKind.ImplementsKeyword, { node })
  }

  abstract(node?: any) {
    return this.has(ts.SyntaxKind.AbstractKeyword, { node })
  }
}
