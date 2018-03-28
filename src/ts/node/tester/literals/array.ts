import { BaseTester } from '../base';

/**
 * Factory to create a VariableDeclaration tester
 * @param node
 * @param options
 */
export function createArrayLiteralTester(node: any, options: any) {
  return new ArrayLiteralTester(node, options)
}

/**
 * Contains:
 * - properties PropertyAssignment[]
 * each PropertyAssignment can contain
 *  - name (Identifier)
 *  - initializer - which can be an ArrayLiteral itself!
 */
export class ArrayLiteralTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   *  * TODO: Call the relevant VariableDeclaration tester that matches the particular type of VariableDeclaration (if available)
   * @param query
   */
  test(query: any): any {
    return true
  }
}
