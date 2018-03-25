import * as ts from 'typescript'
import { BaseTester } from '../base';
import { ClassMembersTester } from './members';
import { ClassMemberTester } from './member';
import { ClassDetailsTester } from '../../details';
import {
  ClassHeritageTester,
  createClassHeritageTester,
  createClassHeritageClauseTester
} from './heritage';

export {
  createClassHeritageClauseTester,
  createClassHeritageTester,
  ClassMembersTester,
  ClassMemberTester
}

export function createClassTester(node: any, options: any = {}) {
  return new ClassTester(node, options)
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
      heritage: this.heritage.info(),
      exported: this.isExported
    }
  }

  test(details: any) {
    // this.testMembers(members)
    return this.testAbstract(details.abstract) &&
      this.testImplements(details.implements) &&
      this.testExtends(details.extends) &&
      this.testMembers(details.members)
  }

  testMembers(membersQuery: any) {
    this.members.test(membersQuery)
  }

  testImplements(implementsQuery: any) {
    this.heritage.test(implementsQuery)
  }

  testAbstract(abstract: boolean) {
    return this.classDetails.is(this.node, 'abstract') === abstract
  }

  testExtends(extendsQuery: any) {
    this.heritage.test(extendsQuery)
  }
}

