import { BaseNodeTester } from '../base';
import {
  IndentifierNodeTester,
  createIndentifierNodeTester
} from '../identifier';

/**
 * Factory to create a VariableDeclaration tester
 * @param node
 * @param options
 */
export function createVariableDeclarationTester(node: any, options: any) {
  return new VariableDeclarationNodeTester(node, options)
}

/**
 * Generic VariableDeclaration tester
 * TODO: Call the relevant VariableDeclaration tester that matches the particular type of VariableDeclaration (if available)
 * Note: has optional initializer just like a function parameter!
 */
export class VariableDeclarationNodeTester extends BaseNodeTester {
  identifierTester: IndentifierNodeTester

  constructor(node: any, options: any) {
    super(node, options)
    this.identifierTester = createIndentifierNodeTester(node.name, this.options)
  }

  get name() {
    return this.identifierTester.name
  }

  info() {
    return {
      name: this.name
    }
  }

  /**
   *  * TODO: Call the relevant VariableDeclaration tester that matches the particular type of VariableDeclaration (if available)
   * @param query
   */
  test(query: any): any {
    return this.identifierTester.test(query.id)
  }
}
