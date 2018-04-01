import {
  declaration
} from '../../functions'
import {
  isMemberType
} from './types'
import { IDetailsTester } from '../../../details/base';

export function createMethodTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'method')) return
  return new MethodLikeTester(node, options)
}

export class MethodLikeTester extends declaration.FunctionLikeNodeTester {
  // inherited
  // parameters: ParametersTester
  accessTester: IDetailsTester

  constructor(node: any, options: any) {
    super(node, options)
    this.accessTester = this.createDetailsTester('access', options)
  }

  test(query: any) {
    super.test(query) && this.testAccess(query.access)
  }

  testAccess(query: any) {
    this.accessTester.test(this.node, query)
  }
}
