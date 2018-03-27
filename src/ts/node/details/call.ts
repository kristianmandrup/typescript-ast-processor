import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class CallTester extends BaseDetailsTester {
  literal: any
  node: any

  constructor(options: any) {
    super(options)
  }

  get syntaxMap() {
    return {
      await: ts.SyntaxKind.AwaitExpression
    }
  }

  await(node?: any) {
    return this.has('await', { node })
  }
}
