import { BaseNodeTester, INodeTester } from '../../base'

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
  }

  /**
   * Initialize
   * @param node
   */
  init(node: any) {
    this.setIdTester(node).setArgumentsTester(node)
  }

  /**
   * Set ID tester
   * @param node
   */
  setIdTester(node: any) {
    const idNode = node.expression || node
    this.setTester({
      factory: 'identifier',
      node: idNode,
    })
    return this
  }

  /**
   * Set arguments tester
   * @param node
   */
  setArgumentsTester(node: any) {
    const argumentNodes = node.arguments
    if (argumentNodes) {
      this.setTester({
        factory: 'function.arguments',
        node: argumentNodes,
      })
    }
    return this
  }

  /**
   * Get name of function
   */
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

  /**
   * Retrieve function arguments info
   */
  get argumentsInfo() {
    return this.argumentsTester.info()
  }

  /**
   * TODO
   * @param query
   */
  test(query: any) {
    return true
  }
}
