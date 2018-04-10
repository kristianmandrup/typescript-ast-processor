import {
  createGetAccessorTester
} from './getter'
import {
  createSetAccessorTester
} from './setter'
import { IndentifierNodeTester } from '../../../identifier';

export function createClassMemberTester(node: any, options: any = {}): any {
  //new MemberTester(node, options)
  return createGetAccessorTester(node, options) &&
    createSetAccessorTester(node, options)

}

export class MemberTester extends IndentifierNodeTester {
  accessTester: any

  constructor(node: any, options: any) {
    super(node, options)
    this.accessTester = this.createDetailsTester('access', node, options)
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
    this.accessTester.test(this.node, query)
  }
}
