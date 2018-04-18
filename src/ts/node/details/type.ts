import * as ts from 'typescript'
import { BaseDetailsTester } from './base'

export function createTypeTester(options: any) {
  return new TypeTester(options)
}

export class TypeTester extends BaseDetailsTester {
  /**
   * Create type details tester
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
    this.modifierKey = 'kind'
  }

  /**
   * syntax map
   */
  get syntaxMap() {
    return {
      void: ts.SyntaxKind.VoidKeyword,
      string: ts.SyntaxKind.StringKeyword,
      number: ts.SyntaxKind.NumberKeyword,
      symbol: ts.SyntaxKind.SymbolKeyword,
      object: ts.SyntaxKind.ObjectKeyword,
      array: ts.SyntaxKind.ArrayType,
      union: ts.SyntaxKind.UnionType,
      boolean: ts.SyntaxKind.BooleanKeyword,
      any: ts.SyntaxKind.AnyKeyword,
    }
  }

  /**
   * Test if node is a void type keyword
   * @param node type node to test
   */
  void(node: any) {
    return this.has('void', { node })
  }

  /**
   * Test if node is a string type keyword
   * @param node type node to test
   */
  string(node: any) {
    return this.has('string', { node })
  }

  /**
   * Test if node is a number type keyword
   * @param node type node to test
   */
  number(node: any) {
    return this.has('number', { node })
  }

  /**
   * Test if node is a Symbol type keyword
   * @param node type node to test
   */
  symbol(node: any) {
    return this.has('symbol', { node })
  }

  /**
   * Test if node is a array type keyword
   * @param node type node to test
   */
  array(node: any) {
    return this.has('array', { node })
  }

  /**
   * Test if node is a union type keyword, such as string | boolean
   * @param node type node to test
   */
  union(node: any) {
    return this.has('union', { node })
  }

  /**
   * Test if node is a boolean type keyword
   * @param node type node to test
   */
  boolean(node: any) {
    return this.has('boolean', { node })
  }

  /**
   * Test if node is an any type keyword
   * @param node type node to test
   */
  any(node: any) {
    return this.has('any', { node })
  }
}
