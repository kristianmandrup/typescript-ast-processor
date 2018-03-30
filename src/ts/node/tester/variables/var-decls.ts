import * as ts from 'typescript'
import { ListTester } from '../generic'
import {
  createVariableDeclarationTester
} from './var-decl'

/**
 * Factory to create a Variable declarations tester
 * @param node
 * @param options
 */
export function createVariableDeclarationsTester(node: any, options: any) {
  return new VariableDeclarationNodesTester(node, options)
}

export class VariableDeclarationNodesTester extends ListTester {
  declarations: any[]

  constructor(node: any, options: any) {
    super(node, options)
    this.declarations = node.declarations || node.parent.declarations || node
  }

  /**
   * Create a variable declaration node tester
   * TODO: make more generic and reuse pattern
   * @param node
   */
  createVariableDeclarationTester(node: any) {
    return createVariableDeclarationTester(node, this.options)
  }

  /**
   * Return list of testers for each node in collection
   * TODO: make more generic and reuse pattern
   */
  get varDeclarationTesters() {
    return this.declarations.map(this.createVariableDeclarationTester)
  }

  /**
   * Count nodes
   * TODO: make more generic and reuse pattern
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
      names: this.names
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
