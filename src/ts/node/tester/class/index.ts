import * as ts from 'typescript'
import { BaseTester } from '../base';
import { ClassMembersTester } from './members';

export class ClassTester extends BaseTester {
  members: ClassMembersTester

  constructor(options: any) {
    super(options)
    this.members = new ClassMembersTester(options)
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
    return true
  }

  testExtends(extendsClass: string) {
    return true
  }
}

