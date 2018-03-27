import { IndentifierNodeTester } from "../../identifier";
import { BaseTester } from "../..";

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
export class ArgumentTester extends BaseTester {
  /**
   * Create Argument tester
   * @param node parameter node to test
   * @param options extra options
   */
  constructor(node: any, options: any) {
    super(node, options)
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
