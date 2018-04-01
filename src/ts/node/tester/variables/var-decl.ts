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
 *
 * Perhaps extend IdentifierNodeTester ??
 */
export class VariableDeclarationNodeTester extends BaseNodeTester {
  identifierNodeTester: IndentifierNodeTester
  variableTester: VariableTester

  constructor(node: any, options: any) {
    super(node, options)
    this.identifierNodeTester = this.createNodeTester('identifier', node.name, this.options) as IndentifierNodeTester

    // perhaps use TypeNodeTester instead!?
    this.variableTester = this.createDetailsTester('variable', node, options) as VariableTester
  }

  /**
   * TODO: perhaps use TypeNodeTester instead!
   */
  get varType(): string {
    return this.variableTester.matches() || 'unknown'
  }

  /**
   * Get name of node
   */
  get name() {
    return this.identifierNodeTester.name
  }

  /**
   * Get info for variable declaration:
   * - name: id of variable
   * - varType: the type of variable
   */
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
    return this.identifierNodeTester.test(query.id)
  }
}
