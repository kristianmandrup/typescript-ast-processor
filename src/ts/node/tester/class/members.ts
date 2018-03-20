import * as ts from 'typescript'
import { BaseTester } from '../base'
import { FunctionLikeTester } from '../function';

export class ClassMembersTester extends BaseTester {
  member: FunctionLikeTester

  constructor(options: any) {
    super(options)
    this.member = new FunctionLikeTester(options)
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
    const { count, names, types } = accessors
    return true
  }

  testMethods(methods: any) {
    const { count, names, types } = methods
    return true
  }
}
