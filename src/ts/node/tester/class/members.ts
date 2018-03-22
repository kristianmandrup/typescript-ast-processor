import * as ts from 'typescript'
import { BaseTester } from '../base'
import { FunctionLikeTester } from '../function';
import { AccessTester } from '../../details/access';

export class ClassMembersTester extends BaseTester {
  member: FunctionLikeTester
  accessTester: AccessTester

  constructor(node: any, options: any) {
    super(node, options)
    this.member = new FunctionLikeTester(node, options)
    this.accessTester = new AccessTester(options)
  }

  test(members: any) {
    const {
      accessors,
      methods,
      list
    } = members
    const method = list.for == 'one' ? 'find' : 'every'

    return this.testAccessors(accessors) &&
      this.testMethods(methods) &&
      list.items[method]((member: any) => this.member.test(member))
  }

  testAccessors(accessors: any) {
    const { count, names, types, list } = accessors
    this.accessTester.test(this.node, names, list.for)
    return true
  }

  testMethods(methods: any) {
    const { count, names, types } = methods
    return true
  }
}
