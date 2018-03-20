import * as ts from 'typescript'
import {
  callFun
} from './util'

import {
  isStr,
  isEmpty,
  nodeTypeCheckName
} from './util'
import { NodeDetailsTester } from './details/node-tester';

export class NodeTester {
  details: NodeDetailsTester

  constructor(options: any) {
    this.details = new NodeDetailsTester(options)
  }


  // returns a test function that knows how to test a single node prop by name
  create(node: any, testMap: any) {
    if (isEmpty(testMap)) return
    return (nodePropName: string) => {
      const testFun = testMap[nodePropName]
      return this.test(node, nodePropName, testFun)
    }
  }

  resolveTestFun(testName: string) {
    return ts[nodeTypeCheckName(testName)]
  }

  resolveTest(node: any, testOpts: any) {
    const {
      tester,
      name
    } = testOpts
    this.details.is(node, name) || callFun(tester, node)
  }

  test(node: any, nodePropName: string, testFun: any) {
    const testName = String(testFun)
    const realTestFun: Function = isStr(testFun) ? this.resolveTestFun(testName) : testFun
    // test on the node itself or one of its members
    const nodeToTest = nodePropName === '$' ? node : node[nodePropName]
    return this.resolveTest(nodeToTest, { tester: realTestFun, name: testName })
  }
}
