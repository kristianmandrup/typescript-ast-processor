import * as ts from 'typescript'
import { IndentifierNodeTester } from '../identifier';
import { IDetailsTester } from '../../details/base';
import { INodeTester } from '../base';

/**
 * Factory to create class tester to query and collect data for class node
 * @param node
 * @param options
 */
export function createClassTester(node: any, options: any = {}) {
  return new ClassTester(node, options)
}

export class ClassTester extends IndentifierNodeTester {
  heritageNodeTester: INodeTester
  memberNodesTester: INodeTester
  classDetailsTester: IDetailsTester
  /**
   * Create class tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any = {}) {
    super(node, options)
    this.heritageNodeTester = this.createNodeTester('class.heritage', node, options)
    this.memberNodesTester = this.createNodeTester('class.members', node, options)
    this.classDetailsTester = this.createDetailsTester('class', node, options)
  }

  /**
   * Collect all info for class node
   */
  info() {
    return {
      name: this.name,
      abstract: this.testAbstract(true),
      heritage: this.heritageNodeTester.info(),
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
    this.memberNodesTester.test(query.members || query)
  }

  /**
   * Query what interfaces class implements
   * @param query
   */
  testImplements(query: any) {
    this.heritageNodeTester.test(query.implements || query)
  }

  /**
   * Query which class the class node extends
   * @param query
   */
  testExtends(query: any) {
    this.heritageNodeTester.test(query.extends || query)
  }

  /**
   * Query if class node is abstract
   * @param query
   */
  testAbstract(query: any) {
    query = query.abstract || query
    return this.classDetailsTester.is(this.node, 'abstract') === query
  }
}

