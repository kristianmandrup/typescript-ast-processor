import * as ts from 'typescript'
import { BaseTester } from './base';

export class ClassTester extends BaseTester {
  constructor(options: any) {
    super(options)
  }

  classTest(node: ts.ClassDeclaration, testDef: any = {}) {
    return this.nodeMemberTest(node, {
      key: 'members'
    })
  }

  classHas(node: ts.ClassDeclaration, tests: any) {
    tests = Array.isArray(tests) ? tests : [tests]
    const classTest = (test: any) => {
      return this.classTest(node, test)
    }
    tests.every(classTest)
  }


  createNamedClassMemberTest(name: string, type?: string) {
    return [{
      type,
      name
    }]
  }
}

