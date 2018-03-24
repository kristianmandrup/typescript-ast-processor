import * as ts from 'typescript'
import { BaseTester } from '../base'
import { ClassMemberTester } from './member';
import { AccessTester } from '../../details/access';

export class ClassMembersTester extends BaseTester {
  member: ClassMemberTester
  accessTester: AccessTester

  constructor(node: any, options: any) {
    super(node, options)
    this.member = new ClassMemberTester(node, options)
    this.accessTester = new AccessTester(options)
  }

  test(members: any) {
    const {
      accessors,
      methods,
      list
    } = members
    const method = this.arrayTestMethod(list.for)
    return this.testAccessors(accessors) &&
      this.testMethods(methods) &&
      list.items[method]((member: any) => this.member.test(member))
  }

  /**
   * - names of accessors
   * - count: min, max, eq (min/max same)
   * - list: detailed test for that one or all accessors must pass
   */
  testAccessors(accessors: any) {
    const { count, names, list } = accessors
    this.accessTester.test(this.node, names, list.for)
    return true
  }

  testMethods(methods: any) {
    const { count, names, types } = methods
    return true
  }
}
