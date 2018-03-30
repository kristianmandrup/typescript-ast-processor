import {
  IndentifierNodeTester,
  createIndentifierNodeTester
} from '../../identifier'
import { ArgumentsTester } from './arguments'
import { BaseNodeTester, INodeTester } from '../../base';

export function createFunctionCallNodeTester(node: any, options: any = {}) {
  return new FunctionCallNodeTester(node, options)
}

/**
 * For function call
 */
export class FunctionCallNodeTester extends BaseNodeTester {
  argumentsTester: INodeTester
  identifierNodeTester: any // INodeTester

  constructor(node: any, options: any) {
    super(node, options)
    this.identifierNodeTester = this.createNodeTester('identifier', node, options)
    if (node.arguments) {
      this.argumentsTester = this.createNodeTester('arguments', node.arguments, options)
    }
  }

  get name() {
    return this.identifierNodeTester.name
  }

  /**
   * Collect all info for function node
   */
  info() {
    return {
      name: this.name,
      parameters: this.argumentsTester.info(),
    }
  }

  test(query: any) {
    return true
  }
}
