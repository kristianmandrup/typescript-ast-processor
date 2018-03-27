import * as ts from 'typescript'
import {
  ClassMembersTester,
} from './members';
import { ClassDetailsTester } from '../../details';

import {
  ClassHeritageTester,
} from './heritage';

import { IndentifierNodeTester } from '../identifier';

export function createClassTester(node: any, options: any = {}) {
  return new ClassTester(node, options)
}

export class ClassTester extends IndentifierNodeTester {
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

  test(query: any): any {
    return this.testName(query) &&
      this.testAbstract(query) &&
      this.testImplements(query) &&
      this.testExtends(query) &&
      this.testMembers(query)
  }

  testMembers(query: any) {
    this.members.test(query.members || query)
  }

  testImplements(query: any) {
    this.heritage.test(query.implements || query)
  }

  testExtends(query: any) {
    this.heritage.test(query.extends || query)
  }

  testAbstract(query: any) {
    query = query.abstract || query
    return this.classDetails.is(this.node, 'abstract') === query
  }
}

