import { IDetailsTester } from '../../../details/base';
import { INodeTester } from '../../base';
import { DeclarationNodeTester } from '../declaration';

/**
 * Factory to create class tester to query and collect data for class node
 * @param node
 * @param options
 */
export function createClassTester(node: any, options: any = {}) {
  return new ClassTester(node, options)
}

export class ClassTester extends DeclarationNodeTester {
  heritageNodeTester: INodeTester
  memberNodesTester: any // INodeTester
  classDetailsTester: IDetailsTester
  identifierNodeTester: any
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

    // NOTE: anonymous function has no ID
    if (this.hasId(node)) {
      this.identifierNodeTester = this.createNodeTester('identifier', node, options)
    }
  }

  /**
   * TODO: Really test if this function is anonomous or NOT
  */
  hasId(node: any) {
    return true
  }

  /**
   * Collect all info for class node
   */
  info() {
    return {
      ...super.info(),
      abstract: this.isAbstract,
      heritage: this.heritage
    }
  }

  /**
   * Whether function is named
  */
  get isNamed(): boolean {
    return Boolean(this.identifierNodeTester)
  }

  testName(query: any) {
    if (!query || !this.isNamed) return true
    return this.identifierNodeTester ? this.identifierNodeTester.testName(query) : false
  }

  /**
   * Whether function is anonymous
   */
  get isAnonymous(): boolean {
    return !this.isNamed
  }

  /**
   * The name of the class (if not anonymous)
   */
  get name() {
    if (!this.isNamed) return undefined
    return this.identifierNodeTester ? this.identifierNodeTester.name : undefined
  }

  /**
   * Whether class declaration exported (only possible if named)
   *
   */
  get isExported() {
    if (!this.isNamed) return false
    return this.identifierNodeTester ? this.identifierNodeTester.isExported : false
  }

  /**
   * whether class is abstract
   */
  get isAbstract() {
    return this.classDetailsTester.is('abstract')
  }

  /**
   * Heritage of the class
   */
  get heritage() {
    return this.heritageNodeTester.info()
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
   * Query all class members
   * @param query
   */
  testAccessors(query: any) {
    this.memberNodesTester.testAccessors(query.accessors || query)
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
    return this.isAbstract === query
  }
}

