import * as ts from 'typescript'
import { BaseDetailsTester } from './base'

export function createClassDetailsTester(options: any) {
  return new ClassDetailsTester(options)
}

export class ClassDetailsTester extends BaseDetailsTester {
  /**
   * Create class details tester
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
  }

  /**
   * syntax map
   */
  get syntaxMap() {
    return {
      extends: ts.SyntaxKind.ExtendsKeyword,
      implements: ts.SyntaxKind.ImplementsKeyword,
      abstract: ts.SyntaxKind.AbstractKeyword,
    }
  }

  /**
   * Test if class node has extends another class
   * @param node
   */
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
