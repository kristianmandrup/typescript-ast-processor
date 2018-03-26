import { BaseTester } from './base'
import * as details from '../details'
import {
  testName,
  nameOf,
  createNameTest,
  nameMatch
} from '../tester/util'


export class IndentifierNodeTester extends BaseTester {
  identifier: details.IdentifierTester

  constructor(node: any, options: any) {
    super(node, options)
  }

  get name() {
    return nameOf(this.node)
  }

  nameMatch(nodeName: string, name: string | RegExp) {
    return nameMatch(nodeName, name)
  }

  createNameTest(nameQuery: any) {
    return createNameTest(nameQuery)
  }

  testName(query: any): boolean {
    return testName(this.name, query.name || query)
  }

  exported(exported: true = true) {
    return Boolean(this.isExported) === Boolean(exported)
  }

  get isExported() {
    return this.identifier.is(this.node, 'exported')
  }
}
