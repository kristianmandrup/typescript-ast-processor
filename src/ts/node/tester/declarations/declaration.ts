import { BaseNodeTester } from '../base'

export function createFunctionTester(node: any, options: any = {}) {
  return new DeclarationNodeTester(node, options)
}

/**
 * For function, arrow function or method
 * TODO: Use BlockStatementTester for adding nesting levels support and testing function block
 */
export class DeclarationNodeTester extends BaseNodeTester {
}
