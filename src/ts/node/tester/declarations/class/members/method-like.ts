import { functionLike } from '../../function'
import { isMemberType } from './types'

export function createMethodTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'method')) return
  return new MethodLikeTester(node, options)
}

export class MethodLikeTester extends functionLike.FunctionLikeNodeTester {
  // inherited ParametersTester

  constructor(node: any, options: any) {
    super(node, options)
    this.init(node)
  }

  /**
   * Initialize
   * @param node
   */
  init(node: any) {
    this.setTester({
      name: 'access',
      type: 'details',
      node,
    })
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
    return this.isExportable
  }

  /**
   * Test member and access level
   * @param query
   */
  test(query: any) {
    super.test(query) && this.runTests(query)
  }

  /**
   * Test access level, such as private, protected etc
   * @param query
   */
  testAccess(query: any) {
    return this.runTest({
      query,
      name: 'access',
    })
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
