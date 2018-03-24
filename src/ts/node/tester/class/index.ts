import * as ts from 'typescript'
import { BaseTester } from '../base';
import { ClassMembersTester } from './members';
import { ClassMemberTester } from './member';
import { ClassDetailsTester } from '../../details';

export {
  ClassMembersTester,
  ClassMemberTester
}

export class ClassTester extends BaseTester {
  members: ClassMembersTester
  classDetails: ClassDetailsTester
  isClass: boolean

  constructor(node: any, options: any = {}) {
    super(node, options)
    this.members = new ClassMembersTester(node, options)
    this.classDetails = new ClassDetailsTester(options)
    this.isClass = ts.isClassDeclaration(node)
  }

  info() {
    return {
      name: this.name,
      abstract: this.testAbstract(true),
    }
  }

  test(details: any) {
    const {
      members,
    } = details
    // this.testMembers(members)
    return this.testAbstract(details.abstract)
    // this.testImplements(details.implements)
    // this.testExtends(details.extends)
  }

  testMembers(members: any) {
    this.members.test(members)
  }

  testImplements(implementsInterfaces: string[]) {
    this.$node.details.is(this.node, 'implements')
  }

  testAbstract(abstract: boolean) {
    return this.classDetails.is(this.node, 'abstract')
  }

  testExtends(extendsClass: string) {
    return true
  }
}

