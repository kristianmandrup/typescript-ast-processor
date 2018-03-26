export {
  ClassTester,
  ClassMembersTester,
  createClassTester,
  createClassHeritageTester,
  createClassHeritageClauseTester,
  createClassMembersTester,
  createClassMemberTester
} from './class'

export {
  createFunctionTester,

} from './function'

import * as $function from './function'
import * as $class from './class'

export {
  $function,
  $class
}

export {
  BaseTester
} from './base'

import * as ts from 'typescript'
import {
  callFun,
  isStr,
  isEmpty,
  nodeTypeCheckName
} from '../../util'

import { NodeDetailsTester } from '../details/generic';

export class NodeTester {
  details: NodeDetailsTester

  constructor(options: any) {
    this.details = new NodeDetailsTester(options)
  }


  // returns a test function that knows how to test a single node prop by name
  create(node: any, testMap: any) {
    if (isEmpty(testMap)) return
    return (nodePropName: string, index?: number, arr?: string[]): boolean => {
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
    return this.details.is(node, name) || callFun(tester, node)
  }

  test(node: any, nodePropName: string, testFun: any): boolean {
    const testName = String(testFun)
    const realTestFun: Function = isStr(testFun) ? this.resolveTestFun(testName) : testFun
    // test on the node itself or one of its members
    const nodeToTest = nodePropName === '$' ? node : node[nodePropName]
    return this.resolveTest(nodeToTest, { tester: realTestFun, name: testName })
  }
}
