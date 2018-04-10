import {
  BaseNodeTester
} from '../../base';

export function isArgument(node: any) {
  return true
}

/**
 * Factory for creating Argument tester
 * @param node parameter node to test
 * @param options extra options
 */
export function createArgumentNodeTester(node: any, options: any = {}) {
  // if (!isArgument(node)) return
  return new ArgumentNodeTester(node, options)
}

/**
 * Argument tester
 * An argument can be pretty much anything... but mostly an identifier, literal or arrow function
 *
 * Should be/use generic NodeTester instead
 */
export class ArgumentNodeTester extends BaseNodeTester {
  identifierNodeTester: any // INodeTester // IndentifierNodeTester

  /**
   * Create Argument tester
   * @param node parameter node to test
   * @param options extra options
   */
  constructor(node: any, options: any) {
    super(node, options)
    // TODO: make generic to allow for any kind of expression
    if (node.name) {
      this.identifierNodeTester = this.createNodeTester('identifier', node.name, options)
    }
  }

  get name() {
    return this.identifierNodeTester ? this.identifierNodeTester.name : undefined
  }

  /**
   * Collect info for Argument node
   */
  info() {
    let obj: any = {
    }
    if (this.name) {
      obj.name = this.name
    }
    return obj
  }
}
