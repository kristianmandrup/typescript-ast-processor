import * as ts from 'typescript'
import { BaseDetailsTester } from './base'

export function createLiteralTester(options: any) {
  return new LiteralTester(options)
}

export class LiteralTester extends BaseDetailsTester {
  /**
   * Create literal details tester
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
      number: ts.SyntaxKind.NumericLiteral,
      string: ts.SyntaxKind.StringLiteral,
      null: ts.SyntaxKind.NullKeyword,
      array: ts.SyntaxKind.ArrayLiteralExpression,
      object: ts.SyntaxKind.ObjectLiteralExpression,
    }
  }

  /**
   * Test if node is a numeric literal, such as: 32
   * @param node node to test
   */
  numeric(node?: any) {
    return this.has('number', { node })
  }

  /**
   * Test if node is a string literal, such as: 'hello'
   * @param node node to test
   */
  string(node?: any) {
    return this.has('string', { node })
  }

  /**
   * Test if node is a null literal, ie: null
   * @param node node to test
   */
  null(node?: any) {
    return this.has('null', { node })
  }

  /**
   * Test if node is a array literal expression, such as: []
   * @param node node to test
   */
  array(node?: any) {
    return this.has('array', { node })
  }

  /**
   * Test if node is an object literal expression, such as: {}
   * @param node node to test
   */
  object(node?: any) {
    return this.has('object', { node })
  }
}
