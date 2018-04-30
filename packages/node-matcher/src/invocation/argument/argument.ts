import { BaseNodeTester } from '../../base'

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
  }

  init(node: any) {
    if (!node.name) return
    this.setTester({
      name: 'identifier',
      node: node.name,
    })
  }

  /**
   * Retrieve registered id node tester
   */
  get idNodeTester(): any {
    return this.getTester({
      name: 'identifier',
    })
  }

  /**
   * Get name of (id reference) argument
   */
  get name() {
    if (!this.identifierNodeTester) return
    return this.identifierNodeTester.name
  }

  /**
   * Collect info for Argument node
   */
  info() {
    let obj: any = {}
    if (this.name) {
      obj.name = this.name
    }
    return obj
  }
}
