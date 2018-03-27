import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class VariableTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get flagMap() {
    return {
      let: ts.NodeFlags.Let,
      const: ts.NodeFlags.Const,
    }
  }

  let(node?: any): boolean {
    return this.has('let', { node })
  }

  const(node?: any): boolean {
    return this.has('const', { node })
  }
}
