import * as ts from 'typescript'
import { ListTester } from '../generic'
import {
  createVariableDeclarationTester
} from './variable-declaration'

/**
 * Factory to create a Variable declarations tester
 * @param node
 * @param options
 */
export function createVariableDeclarationsTester(node: any, options: any) {
  return new VariableDeclarationsTester(node, options)
}

export class VariableDeclarationsTester extends ListTester {
  declarations: any[]

  constructor(node: any, options: any) {
    super(node, options)
    this.declarations = node.declarations || node.parent.declarations || node
  }

  createVariableDeclarationTester(node: any, options: any) {
    return createVariableDeclarationTester(node, options)
  }

  get declarationsCount() {
    return this.declarations.length
  }

  info() {
    return {
      count: this.declarationsCount
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
