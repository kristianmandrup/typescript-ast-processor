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
    const idNode = node.expression || node
    this.identifierNodeTester = this.createNodeTester('identifier', idNode, options)
    const argumentNodes = node.arguments
    if (argumentNodes) {
      this.argumentsTester = this.createNodeTester('function.arguments', argumentNodes, options)
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
      arguments: this.argumentsInfo,
    }
  }

  get argumentsInfo() {
    return this.argumentsTester.info()
  }


  test(query: any) {
    return true
  }
}
