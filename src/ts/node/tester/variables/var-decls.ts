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

  createVariableDeclarationTester(node: any) {
    return createVariableDeclarationTester(node, this.options)
  }

  get varDeclarationTesters() {
    return this.declarations.map(this.createVariableDeclarationTester)
  }

  get declarationsCount() {
    return this.declarations.length
  }

  protected declName(varDeclarationTester: any) {
    return varDeclarationTester.name
  }

  get names() {
    return this.varDeclarationTesters.map(this.declName)
  }

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

  testVariablesDeclaration(query: any) {

  }
}
