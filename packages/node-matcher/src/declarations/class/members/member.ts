import { createGetAccessorTester } from './getter'
import { createSetAccessorTester } from './setter'
import { DeclarationNodeTester } from '../../declaration'

export function createClassMemberTester(node: any, options: any = {}): any {
  //new MemberTester(node, options)
  return (
    createGetAccessorTester(node, options) &&
    createSetAccessorTester(node, options)
  )
}

export class MemberTester extends DeclarationNodeTester {
  accessTester: any

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
      factory: 'access',
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

  /**
   * A member is never exported
   */
  get isExportable() {
    return false
  }

  /**
   * A member is never exported
   */
  get isExported() {
    return false
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
}
