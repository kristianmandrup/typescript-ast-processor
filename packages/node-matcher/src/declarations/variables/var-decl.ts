import { IndentifierNodeTester } from '../../identifier'
import { DeclarationNodeTester } from '../declaration'

// import { api as detailsApi } from '../../details';

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
export class VariableDeclarationNodeTester extends DeclarationNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
    this.init(node)
  }

  /**
   * Initialize
   * @param node
   */
  init(node: any) {
    if (!node.type) return
    this.setTester({
      factory: 'type',
      node: node.type,
    })
  }

  /**
   * Get the type tester
   */
  get typeTester() {
    return this.getTester({
      name: 'type',
    })
  }

  /**
   * Determine the variable declaration type
   */
  get varType(): string {
    if (!this.typeTester) return this.unknownType
    return this.typeTester.matches() || this.unknownType
  }

  /**
   * Unknown type
   */
  get unknownType() {
    return 'unknown'
  }

  /**
   * Test on matching variable declaration type
   * @param query
   */
  testVarType(query: any) {
    if (!this.isQuery(query.varType)) return true
    return this.varType === query.varType
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
      varType: this.varType,
    }
  }

  /**
   * TODO: Call the relevant VariableDeclaration tester that
   * matches the particular type of VariableDeclaration (if available)
   * @param query
   */
  test(query: any): any {
    return super.test(query) && this.testVarType(query)
  }
}
