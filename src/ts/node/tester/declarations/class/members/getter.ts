import {
  isMemberType
} from './types'
import { MethodLikeTester } from './method-like';

export function createGetAccessorTester(node: any, options: any = {}): GetAccessorTester | undefined {
  if (!isMemberType(node, 'getter')) return
  return new GetAccessorTester(node, options)
}

export class GetAccessorTester extends MethodLikeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  test(query: any) {
    super.test(query) && this.testAccess(query.access)
  }
}

