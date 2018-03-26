import * as ts from 'typescript'
import { BaseTester } from '../base'
import { ClassMemberTester } from './member';
import { AccessTester } from '../../details/access';

export function createClassMembersTester(node: any, options: any = {}) {
  return new ClassMembersTester(node, options)
}

export class ClassMembersTester extends BaseTester {
  member: ClassMemberTester
  method: ClassMemberTester
  accessor: AccessTester

  constructor(node: any, options: any) {
    super(node, options)
    // needs to be used when iterating only
    // this.member = new ClassMemberTester(node, options)
    this.accessor = new AccessTester(options)
    this.method = this.member // TODO: for now
  }

  test(query: any) {
    return this.testAccessors(query.accessors) &&
      this.testMethods(query.methods)
    // list.items[method]((member: any) => this.member.test(member))
  }

  /**
   * - names of accessors
   * - count: min, max, eq (min/max same)
   * - list: detailed test for that one or all accessors must pass
   */
  testAccessors(query: any) {
    const { keyName, method } = this.arrayTestMethod(query)
    this.accessor.test(this.node, query[keyName], method)
    return true
  }

  testMethods(query: any) {
    // const { keyName, method } = this.arrayTestMethod(query)
    this.method.test(query)
  }
}
