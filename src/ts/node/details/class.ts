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

  /**
   * Test if class node extends another class
   * @param node class node to test
   */
  extends(node?: any) {
    return this.subclass(node)
  }

  /**
   * Test if class node implements another class
   * @param node class node to test
   */
  implements(node?: any) {
    return this.has('implements', { node })
  }

  /**
   * Test if class node is abstract (has abstract modifier)
   * @param node class node to test
   */
  abstract(node?: any) {
    return this.has('abstract', { node })
  }
}
