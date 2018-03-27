import { IndentifierNodeTester } from "../../identifier";
import { ArgumentsTester } from "./arguments";

export function createFunctionCallNodeTester(node: any, options: any = {}) {
  return new FunctionCallNodeTester(node, options)
}

/**
 * For function call
 */
export class FunctionCallNodeTester extends IndentifierNodeTester {
  argumentsTester: ArgumentsTester

  constructor(node: any, options: any) {
    super(node, options)
    if (node.arguments) {
      this.argumentsTester = new ArgumentsTester(node.arguments, options)
    }
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
}
