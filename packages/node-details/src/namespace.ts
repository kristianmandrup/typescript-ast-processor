import * as ts from 'typescript'
import { BaseDetailsTester } from './base'

export function createNamespaceTester(options: any) {
  return new NamespaceTester(options)
}

export class NamespaceTester extends BaseDetailsTester {
  /**
   * Create namespace details tester
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
  }

  /**
   * Flag map
   */
  get flagMap() {
    return {
      namespace: ts.NodeFlags.Namespace,
      nestedNamespace: ts.NodeFlags.NestedNamespace,
    }
  }

  /**
   * Test if node is in a namespace (ie. namespace flag set)
   * Note: If namespace is set, nestedNamespace can NOT be set and vice versa
   * @param node node to test
   */
  inNs(node?: any) {
    return this.has('namespace', { node })
  }

  /**
   * Test if node is in a nested namespace (ie. nested namespace flag set)
   * Note: If namespace is set, nestedNamespace can NOT be set and vice versa
   * @param node node to test
   */
  nestedInNs(node?: any) {
    return this.has('nestedNamespace', { node })
  }
}
