import { isMemberType } from './types'
import { MethodLikeTester } from './method-like'

export function createAccessorTester(
  node: any,
  options: any = {},
): AccessorTester | undefined {
  if (!isMemberType(node, 'getter')) return
  return new AccessorTester(node, options)
}

export class AccessorTester extends MethodLikeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Initialize
   * @param node
   */
  init(node: any) {
    this.setTester({
      name: 'member',
      factory: 'class.member',
    })
  }

  /**
   * Use class member tester
   * @param query
   */
  testMember(query: any) {
    return this.doTest({
      query,
      name: 'member',
    })
  }

  /**
   * Info
   */
  info() {
    return {
      ...super.info(),
      accessor: true,
    }
  }

  /**
   * Test by query
   * @param query
   */
  test(query: any) {
    super.test(query) && this.testMember(query)
  }
}
