import * as ts from 'typescript'
import {
  callFun,
  isFunction
} from './util'

export class NodeTest {
  create(node: any, testMap: any) {
    return (nodePropName: string) => {
      const testFun = testMap[nodePropName]
      return this.test(node, nodePropName, testFun)
    }
  }

  test(node: any, nodePropName: string, testFun: string | Function) {
    const tsTestFun = isFunction(testFun) ? testFun : ts[`is${testFun}`]
    const nodeToTest = nodePropName === '$' ? node : node[nodePropName]
    return callFun(() => tsTestFun(nodeToTest))
  }
}
