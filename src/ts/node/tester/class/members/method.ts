import { FunctionLikeTester } from '../../function'
import {
  isMemberType
} from './types'

export function createClassMethodTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'method')) return
  return new ClassMethodTester(node, options)
}

export class ClassMethodTester extends FunctionLikeTester {
  // inherited
  // parameters: ParametersTester

  constructor(node: any, options: any) {
    super(node, options)
  }

  test(query: any) {
    super.test(query) && this.testAccess(query.access)
  }

  testAccess(query: any) {
    return true
  }
}
