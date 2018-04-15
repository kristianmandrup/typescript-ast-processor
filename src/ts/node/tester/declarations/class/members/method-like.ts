import { functionLike } from '../../function'
import { isMemberType } from './types'
import { IDetailsTester } from '../../../../details/base'

export function createMethodTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'method')) return
  return new MethodLikeTester(node, options)
}

export class MethodLikeTester extends functionLike.FunctionLikeNodeTester {
  // inherited
  // parameters: ParametersTester
  accessTester: IDetailsTester

  constructor(node: any, options: any) {
    super(node, options)
    this.init(node)
  }

  /**
   * Initialize
   * @param node
   */
  init(node: any) {
    this.accessTester = this.createDetailsTester('access', node)
  }

  /**
   * A member is never exported
   */
  get isExportable() {
    return false
  }

  /**
   * A member (ie. such as a method like) is never exported
   */
  get isExported() {
    return false
  }

  /**
   * Test member and access level
   * @param query
   */
  test(query: any) {
    super.test(query) && this.testAccess(query)
  }

  /**
   * Test access level, such as private, protected etc
   * @param query
   */
  testAccess(query: any) {
    this.accessTester.test(this.node, query.access || query)
  }

  /**
   * Info
   */
  info() {
    return {
      ...super.info(),
      member: true,
    }
  }
}
