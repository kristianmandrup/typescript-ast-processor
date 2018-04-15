import * as ts from 'typescript'
import { BaseNodeTester } from './base'
import { testName, nameOf, createNameTest, nameMatch } from '../tester/util'
import { IDetailsTester } from '../details/base'

export function createIndentifierNodeTester(node: any, options: any = {}) {
  return new IndentifierNodeTester(node, options)
}

export class IndentifierNodeTester extends BaseNodeTester {
  identifierTester: IDetailsTester
  exportTester: any // IDetailsTester
  idNode: any

  /**
   * Create Identifier node tester
   * @param node the node to test
   * @param options extra test options
   */
  constructor(node: any, options: any) {
    super(node, options)
    this.init(node)
  }

  init(node: any) {
    this.idNode = this.idNodeFor(node)
    this.exportTester = this.createDetailsTester('identifier', node)
    this.identifierTester = this.createDetailsTester('identifier', this.idNode)
  }

  /**
   * TODO: make it work for any kind of identifiable node!
   * @param node
   */
  protected idNodeFor(node: any): any {
    if (ts.isArrowFunction(node)) {
      return this.idNodeFor(node.parent)
    }
    return node.declarationList
      ? node.declarationList.declarations[0]
      : node.name || node
  }

  /**
   * Get node info/data
   */
  info() {
    return {
      name: this.name,
      exported: this.isExported,
    }
  }

  /**
   * Get name of node (using nameOf utility method)
   */
  get name() {
    return this.nameOf(this.idNode)
  }

  /**
   * Get name of node
   * @param node
   */
  nameOf(node: any) {
    return nameOf(node)
  }

  /**
   * See if node name matches nameExpr (string or RegExp)
   * @param nodeName
   * @param nameExpr
   */
  nameMatch(nodeName: string, nameExpr: string | RegExp | Function) {
    return nameMatch(nodeName, nameExpr)
  }

  /**
   * Create a name test using a query
   * @param nameQuery
   */
  createNameTest(nameQuery: any) {
    return createNameTest(nameQuery)
  }

  /**
   * Test name of node using query
   * @param query
   */
  testName(query: any): boolean {
    return testName(this.name, query.name || query)
  }

  /**
   * Test if identifier export status
   * @param exported
   */
  testExported(exported: true = true) {
    return Boolean(this.isExported) === Boolean(exported)
  }

  /**
   * Whether identifier is exported
   */
  get isExported(): boolean {
    return Boolean(this.exportTester.is('exported'))
  }
}
