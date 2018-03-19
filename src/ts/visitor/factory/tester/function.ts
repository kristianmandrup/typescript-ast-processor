import * as ts from 'typescript'
import { BaseTester } from './base'

export class FunctionTester extends BaseTester {
  constructor(options: any) {
    super(options)
  }

  paramsTest(node: ts.FunctionLikeDeclaration, testDef: any = {}) {
    testDef = Object.assign({
      key: 'parameters'
    }, testDef)
    return this.nodeMemberTest(node, )
  }

  callableHas(node: ts.FunctionLikeDeclaration, tests: any) {
    tests = Array.isArray(tests) ? tests : [tests]
    const paramsTest = (test: any) => {
      return this.paramsTest(node, test)
    }
    tests.every(paramsTest)
  }

  createNamedParameterTest(name: string, type?: string) {
    return [{
      type,
      name
    }]
  }
}
