import * as ts from 'typescript'
import { BaseTester } from '../base';
import { ClassMembersTester } from './members';

export class ClassTester extends BaseTester {
  members: ClassMembersTester

  constructor(node: any, options: any) {
    super(node, options)
    this.members = new ClassMembersTester(node, options)
  }

  test(details: any) {
    const {
      members,
      implementsInterfaces,
      extendsClass
    } = details
    this.testMembers(members)
    this.testImplements(implementsInterfaces)
    this.testExtends(extendsClass)
  }

  testMembers(members: any) {
    this.members.test(members)
  }

  testImplements(implementsInterfaces: string[]) {
    this.$node.details.is(this.node, 'implements')
  }

  testExtends(extendsClass: string) {
    return true
  }
}

