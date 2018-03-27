import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class VariableTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  let(node?: any): boolean {
    return this.has(ts.NodeFlags.Let, { node })
  }

  const(node?: any): boolean {
    return this.has(ts.NodeFlags.Const, { node })
  }
}
