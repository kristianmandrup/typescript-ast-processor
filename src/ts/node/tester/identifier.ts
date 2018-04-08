import { BaseNodeTester } from './base'
import {
  testName,
  nameOf,
  createNameTest,
  nameMatch
} from '../tester/util'
import { IDetailsTester } from '../details/base';

export function createIndentifierNodeTester(node: any, options: any = {}) {
  return new IndentifierNodeTester(node, options)
}

export class IndentifierNodeTester extends BaseNodeTester {
  identifierTester: IDetailsTester

  /**
   * Create Identifier node tester
   * @param node the node to test
   * @param options extra test options
   */
  constructor(node: any, options: any) {
    super(node, options)
    this.identifierTester = this.createDetailsTester('identifier', node, options)
  }

  /**
   * Get name of node (using nameOf utility method)
   */
  get name() {
    return this.nameOf(this.node)
  }

  nameOf(node: any) {
    return nameOf(this.node)
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
  exported(exported: true = true) {
    return Boolean(this.isExported) === Boolean(exported)
  }

  /**
   * Whether identifier is exported
   */
  get isExported() {
    return this.identifierTester.is(this.node, 'exported')
  }
}
