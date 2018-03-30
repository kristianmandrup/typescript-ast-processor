import {
  IndentifierNodeTester,
  createIndentifierNodeTester
} from '../../identifier'
import { ArgumentsTester } from './arguments'
import { BaseNodeTester } from '../../base';

export function createFunctionCallNodeTester(node: any, options: any = {}) {
  return new FunctionCallNodeTester(node, options)
}

/**
 * For function call
 */
export class FunctionCallNodeTester extends BaseNodeTester {
  argumentsTester: ArgumentsTester
  identifierTester: IndentifierNodeTester

  constructor(node: any, options: any) {
    super(node, options)
    this.identifierTester = createIndentifierNodeTester({ ...options, node })
    if (node.arguments) {
      this.argumentsTester = new ArgumentsTester(node.arguments, options)
    }
  }

  get name() {
    return this.identifierTester.name
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
