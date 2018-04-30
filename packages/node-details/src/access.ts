import * as ts from 'typescript'
import { BaseDetailsTester } from './base'

export function createAccessTester(options: any) {
  return new AccessTester(options)
}

export interface IAccessTester {
  private(node?: any): boolean
  protected(node?: any): boolean
  public(node?: any): boolean
  static(node?: any): boolean
}

export class AccessTester extends BaseDetailsTester {
  /**
   * Create Access details tester
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
  }

  /**
   * Syntax map
   */
  get syntaxMap() {
    return {
      private: ts.SyntaxKind.PrivateKeyword,
      protected: ts.SyntaxKind.ProtectedKeyword,
      public: ts.SyntaxKind.PublicKeyword,
      static: ts.SyntaxKind.StaticKeyword,
    }
  }

  /**
   * Test if class member node has private access modifier
   * @param node function node to test
   * @returns { boolean } whether node is private
   */
  private(node?: any): boolean {
    return this.has('private', { node })
  }

  /**
   * Test if class member node has protected access modifier
   * @param node function node to test
   * @returns { boolean } whether node is protected
   */
  protected(node?: any): boolean {
    return this.has('protected', { node })
  }

  /**
   * Test if class member has public access modifier
   * @param node function node to test
   * @returns { boolean } whether node is public
   */
  public(node?: any): boolean {
    return this.has('public', { node })
  }

  /**
   * Test if class member has static access modifier
   * @param node function node to test
   * @returns { boolean } whether node is static
   */
  static(node?: any): boolean {
    return this.has('static', { node })
  }
}
