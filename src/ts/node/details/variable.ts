import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export function createVariableTester(options: any) {
  return new VariableTester(options)
}

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

  /**
   * Test if variable node has a let flag set
   * Note: If const is set, let can NOT be set and vice versa
   * @param node type node to test
   */
  let(node?: any): boolean {
    return this.has('let', { node })
  }

  /**
   * Test if variable node has a const flag set
   * Note: If const is set, let can NOT be set and vice versa
   * @param node type node to test
   */
  const(node?: any): boolean {
    return this.has('const', { node })
  }
}
