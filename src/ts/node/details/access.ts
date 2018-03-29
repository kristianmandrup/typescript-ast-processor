import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export function createAccessTester(options: any) {
  return new AccessTester(options)
}

export class AccessTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get syntaxMap() {
    return {
      private: ts.SyntaxKind.PrivateKeyword,
      protected: ts.SyntaxKind.ProtectedKeyword,
      public: ts.SyntaxKind.PublicKeyword,
      static: ts.SyntaxKind.StaticKeyword
    }
  }

  /**
   * Test if class member node has private access modifier
   * @param node function node to test
   */
  private(node?: any) {
    return this.has('private', { node })
  }

  /**
   * Test if class member node has protected access modifier
   * @param node function node to test
   */
  protected(node?: any) {
    return this.has('protected', { node })
  }

  /**
   * Test if class member has public access modifier
   * @param node function node to test
   */
  public(node?: any) {
    return this.has('public', { node })
  }

  /**
   * Test if class member has static access modifier
   * @param node function node to test
   */
  static(node?: any) {
    return this.has('static', { node })
  }
}
