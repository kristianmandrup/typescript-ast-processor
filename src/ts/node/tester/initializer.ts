import { initializerDetails } from "./util";
import { BaseTester } from "./base";

/**
 * Factory for creating InitializerNodeTester tester
 * @param node initializer node to test
 * @param options extra options
 */
export function createInitializerNodeTester(node: any, options: any = {}) {
  // if (!isInitializer(node)) return
  return new InitializerNodeTester(node, options)
}

export class InitializerNodeTester extends BaseTester {

  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Info for Parameter node
   */
  info() {
    return initializerDetails(this.node)
  }
}
