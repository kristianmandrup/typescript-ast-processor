import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

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

  private(node?: any) {
    return this.has('private', { node })
  }
  protected(node?: any) {
    return this.has('protected', { node })
  }
  public(node?: any) {
    return this.has('public', { node })
  }
  static(node?: any) {
    return this.has('static', { node })
  }
}
