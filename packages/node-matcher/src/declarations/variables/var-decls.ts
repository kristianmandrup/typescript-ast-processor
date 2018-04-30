import { BaseNodeTester } from '../../base'

/**
 * Factory to create a Variable declarations tester
 * @param node
 * @param options
 */
export function createVariableDeclarationsTester(node: any, options: any) {
  return new VariableDeclarationNodesTester(node, options)
}

export class VariableDeclarationNodesTester extends BaseNodeTester {
  declarations: any[]
  varDeclarationTesters: any[]

  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Initialize
   * @param node
   */
  init(node: any) {
    super.init(node)
    this.declarations = node.declarations || node.parent.declarations || node
    this.varDeclarationTesters = this.declarations.map(
      this.createVariableDeclarationTester.bind(this),
    )
  }

  /**
   * Create a variable declaration node tester
   * @param node
   */
  createVariableDeclarationTester(node: any) {
    return this.createNodeTester('decl.var', node)
  }

  /**
   * Count nodes
   */
  get declarationsCount() {
    return this.declarations.length
  }

  /**
   * Get name of declaration node via tester
   * @param varDeclarationTester
   */
  protected declName(varDeclarationTester: any) {
    return varDeclarationTester.name
  }

  /**
   * Get names of all nodes via mapping using tester
   */
  get names() {
    return this.varDeclarationTesters.map(this.declName)
  }

  /**
   * Get info for variable declaration
   * - names: all names of variables declared
   * - count: number of variables declared
   */
  info() {
    return {
      count: this.declarationsCount,
      names: this.names,
    }
  }

  /**
   * Example:
   * {
   *   count: {
   *     min: 2
   *     max: 5
   *   }
   * }
   * @param query
   */
  test(query: any) {
    query = query.count || query
    return this.testCount(query, this.declarationsCount)
  }

  /**
   * TODO
   * @param query
   */
  testVariablesDeclaration(query: any) {
    return false
  }
}
