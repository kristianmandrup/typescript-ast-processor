import { IDetailsTester } from '../../../details/base'
import { INodeTester } from '../../base'
import { DeclarationNodeTester } from '../declaration'
import { isDefined } from '../../../../util'

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
  /**
   * Create class tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any = {}) {
    super(node, options)
    this.setTester({ name: 'heritage', factory: 'class.heritage' })
    this.setTester({ name: 'members', factory: 'class.members' })
    this.setTester({ name: 'class', factory: 'class', type: 'details' })
  }

  /**
   * Collect all info for class node
   */
  info() {
    return {
      ...super.info(),
      abstract: this.isAbstract,
      heritage: this.heritage,
    }
  }

  /**
   * whether class is abstract
   */
  get isAbstract() {
    return this.getTester({
      type: 'details',
      name: 'class',
    }).is('abstract')
  }

  /**
   * Heritage of the class
   */
  get heritage() {
    return this.getTester({
      name: 'heritage',
    }).info()
  }

  /**
   * Query class
   * @param query
   */
  test(query: any): any {
    const result = this.query(query)
    return (
      result.name &&
      result.exported &&
      result.abstract &&
      result.implements &&
      result.extends &&
      result.members
    )
  }

  query(query: any) {
    return {
      name: this.testName(query),
      exported: this.testExported(query),
      abstract: this.testAbstract(query),
      implements: this.testImplements(query),
      extends: this.testExtends(query),
      members: this.testMembers(query),
    }
  }

  /**
   * Query all class members
   * @param query
   */
  testMembers(query: any) {
    return this.doTest({
      query,
      name: 'members',
      test: 'testMembers',
    })
  }

  /**
   * Query all class members
   * @param query
   */
  testAccessors(query: any) {
    return this.doTest({
      query,
      name: 'members',
      test: 'testAccessors',
    })
  }

  /**
   * Query what interfaces class implements
   * @param query
   */
  testImplements(query: any) {
    this.doTest({
      query,
      qprop: 'implements',
      name: 'heritage',
    })
  }

  /**
   * Query which class the class node extends
   * @param query
   */
  testExtends(query: any) {
    this.doTest({
      query,
      qprop: 'extends',
      name: 'heritage',
    })
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
