import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class NamespaceTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  in(node?: any) {
    return this.has(ts.NodeFlags.Namespace, { node })
  }
  nested(node?: any) {
    return this.has(ts.NodeFlags.NestedNamespace, { node })
  }
}
