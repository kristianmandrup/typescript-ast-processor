import * as ts from 'typescript'
import {
  callFun
} from './util'

import {
  isStr,
  isEmpty
} from './util'

export class NodeTest {
  // returns a test function that knows how to test a single node prop by name
  create(node: any, testMap: any) {
    if (isEmpty(testMap)) return
    return (nodePropName: string) => {
      const testFun = testMap[nodePropName]
      return this.test(node, nodePropName, testFun)
    }
  }

  test(node: any, nodePropName: string, testFun: any) {
    let realTestFun: Function
    if (isStr(testFun)) {
      let testFunName = String(testFun)
      testFunName = /^is/.test(testFunName) ? testFunName : `is${testFunName}`
      realTestFun = ts[testFunName]
    } else {
      realTestFun = testFun
    }
    // test on the node itself or one of its members
    const nodeToTest = nodePropName === '$' ? node : node[nodePropName]
    return callFun(realTestFun, nodeToTest)
  }
}
