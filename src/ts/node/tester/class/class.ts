import * as ts from 'typescript'
import {
  ClassMembersTester,
} from './members';
import { ClassDetailsTester } from '../../details';

import {
  ClassHeritageTester,
} from './heritage';

import { IndentifierNodeTester } from '../identifier';

/**
 * Factory to create class tester to query and collect data for class node
 * @param node
 * @param options
 */
export function createClassTester(node: any, options: any = {}) {
  return new ClassTester(node, options)
}

export class ClassTester extends IndentifierNodeTester {
  heritage: ClassHeritageTester
  members: ClassMembersTester
  classDetails: ClassDetailsTester
  isClass: boolean

  /**
   * Create class tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any = {}) {
    super(node, options)
    this.heritage = new ClassHeritageTester(node, options)
    this.members = new ClassMembersTester(node, options)
    this.classDetails = new ClassDetailsTester(options)
    this.isClass = ts.isClassDeclaration(node)
  }

  /**
   * Collect all info for class node
   */
  info() {
    return {
      name: this.name,
      abstract: this.testAbstract(true),
      heritage: this.heritage.info(),
      exported: this.isExported
    }
  }

  /**
   * Query class
   * @param query
   */
  test(query: any): any {
    return this.testName(query) &&
      this.testAbstract(query) &&
      this.testImplements(query) &&
      this.testExtends(query) &&
      this.testMembers(query)
  }

  /**
   * Query all class members
   * @param query
   */
  testMembers(query: any) {
    this.members.test(query.members || query)
  }

  /**
   * Query what interfaces class implements
   * @param query
   */
  testImplements(query: any) {
    this.heritage.test(query.implements || query)
  }

  /**
   * Query which class the class node extends
   * @param query
   */
  testExtends(query: any) {
    this.heritage.test(query.extends || query)
  }

  /**
   * Query if class node is abstract
   * @param query
   */
  testAbstract(query: any) {
    query = query.abstract || query
    return this.classDetails.is(this.node, 'abstract') === query
  }
}

