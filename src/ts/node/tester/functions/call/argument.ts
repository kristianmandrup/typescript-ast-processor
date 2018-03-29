import {
  createIndentifierNodeTester,
  IndentifierNodeTester
} from '../../identifier'
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
export function createArgumentTester(node: any, options: any = {}) {
  // if (!isArgument(node)) return
  return new ArgumentTester(node, options)
}

/**
 * Argument tester
 * An argument can be pretty much anything... but mostly an identifier, literal or arrow function
 */
export class ArgumentTester extends BaseNodeTester {
  idTester: IndentifierNodeTester

  /**
   * Create Argument tester
   * @param node parameter node to test
   * @param options extra options
   */
  constructor(node: any, options: any) {
    super(node, options)
    this.idTester = createIndentifierNodeTester(this.node.name, options)
  }

  /**
   * Collect info for Argument node
   */
  info() {
    return {
      // name: this.name
    }
  }
}
