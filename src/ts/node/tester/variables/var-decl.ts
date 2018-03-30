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
  identifierTester: IndentifierNodeTester
  variableTester: VariableTester

  constructor(node: any, options: any) {
    super(node, options)
    this.identifierTester = this.factories.createTester('identifier', node.name, this.options)

    // perhaps use TypeNodeTester instead!?
    this.variableTester = this.factories.details.createTester('variable', {
      ...options,
      node
    })
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
    return this.identifierTester.name
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
    return this.identifierTester.test(query.id)
  }
}
