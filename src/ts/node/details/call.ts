import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class CallTester extends BaseDetailsTester {
  literal: any
  node: any

  constructor(options: any) {
    super(options)
  }

  await(node?: any) {
    return this.has(ts.SyntaxKind.ArrowFunction, { node })
  }
}
