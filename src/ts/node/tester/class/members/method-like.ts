import {
  FunctionLikeNodeTester
} from '../../function'
import {
  isMemberType
} from './types'
import { AccessTester } from '../../../details';

export function createMethodTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'method')) return
  return new MethodLikeTester(node, options)
}

export class MethodLikeTester extends FunctionLikeNodeTester {
  // inherited
  // parameters: ParametersTester
  accessTester: AccessTester

  constructor(node: any, options: any) {
    super(node, options)
    this.accessTester = new AccessTester(options)
  }

  test(query: any) {
    super.test(query) && this.testAccess(query.access)
  }

  testAccess(query: any) {
    this.accessTester.test(this.node, query)
  }
}
