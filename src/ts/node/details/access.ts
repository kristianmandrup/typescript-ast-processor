import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class AccessTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  private(node?: any) {
    return this.has(ts.SyntaxKind.PrivateKeyword, { node })
  }
  protected(node?: any) {
    return this.has(ts.SyntaxKind.ProtectedKeyword, { node })
  }
  public(node?: any) {
    return this.has(ts.SyntaxKind.PublicKeyword, { node })
  }
  static(node?: any) {
    return this.has(ts.SyntaxKind.StaticKeyword, { node })
  }
}
