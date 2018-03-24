import * as ts from 'typescript'
import { BaseTester } from '../base';
import { ClassMembersTester } from './members';
import { ClassMemberTester } from './member';
import { ClassDetailsTester } from '../../details';
import { ClassHeritageTester } from './heritage';

export {
  ClassMembersTester,
  ClassMemberTester
}

export class ClassTester extends BaseTester {
  heritage: ClassHeritageTester
  members: ClassMembersTester
  classDetails: ClassDetailsTester
  isClass: boolean

  constructor(node: any, options: any = {}) {
    super(node, options)
    this.heritage = new ClassHeritageTester(node, options)
    this.members = new ClassMembersTester(node, options)
    this.classDetails = new ClassDetailsTester(options)
    this.isClass = ts.isClassDeclaration(node)
  }

  info() {
    return {
      name: this.name,
      abstract: this.testAbstract(true),
      heritage: this.heritage.info()
    }
  }

  test(details: any) {
    const {
      members,
    } = details
    // this.testMembers(members)
    return this.testAbstract(details.abstract) &&
      this.testImplements(details.implements) &&
      this.testExtends(details.extends)
  }

  testMembers(members: any) {
    this.members.test(members)
  }

  testImplements(implementsQuery: string) {
    this.heritage.test(implementsQuery)
  }

  testAbstract(abstract: boolean) {
    return this.classDetails.is(this.node, 'abstract')
  }

  testExtends(extendsQuery: string) {
    this.heritage.test(extendsQuery)
  }
}

