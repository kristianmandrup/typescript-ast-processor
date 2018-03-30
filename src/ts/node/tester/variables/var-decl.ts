import { BaseNodeTester } from '../base';
import {
  IndentifierNodeTester,
  createIndentifierNodeTester
} from '../identifier';
import { createVariableTester, VariableTester } from '../../details/variable';

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
  variableTester: VariableTester

  constructor(node: any, options: any) {
    super(node, options)
    this.identifierTester = createIndentifierNodeTester(node.name, this.options)
    this.variableTester = createVariableTester({
      ...options,
      node
    })
  }

  get varType(): string {
    return this.variableTester.matches() || 'unknown'
  }

  get name() {
    return this.identifierTester.name
  }

  info() {
    return {
      name: this.name,
      varType: this.varType
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
