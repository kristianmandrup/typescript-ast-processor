import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class NamespaceTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get flagMap() {
    return {
      namespace: ts.NodeFlags.Namespace,
      nestedNamespace: ts.NodeFlags.NestedNamespace,
    }
  }

  in(node?: any) {
    return this.has('namespace', { node })
  }
  nested(node?: any) {
    return this.has('nestedNamespace', { node })
  }
}
