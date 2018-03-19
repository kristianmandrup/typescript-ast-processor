import * as ts from 'typescript'
import {
  callFun
} from './util'

import {
  isStr
} from './util'

export class NodeTest {
  create(node: any, testMap: any) {
    return (nodePropName: string) => {
      const testFun = testMap[nodePropName]
      return this.test(node, nodePropName, testFun)
    }
  }

  test(node: any, nodePropName: string, testFun: string | Function) {
    let realTestFun: Function
    if (isStr(testFun)) {
      let testFunName = String(testFun)
      testFunName = /^is/.test(testFunName) ? testFunName : `is${testFunName}`
      realTestFun = ts[testFunName]
    }
    const nodeToTest = nodePropName === '$' ? node : node[nodePropName]
    return callFun(() => realTestFun(nodeToTest))
  }
}
