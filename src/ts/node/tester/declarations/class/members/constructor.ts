import {
  isMemberType
} from './types'
import { MethodLikeTester } from './method-like';

export function createConstructorTester(node: any, options: any = {}): ConstructorTester | undefined {
  if (!isMemberType(node, 'constructor')) return
  return new ConstructorTester(node, options)
}

/**
 * Constructor node tester
 */
export class ConstructorTester extends MethodLikeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  get name() {
    return 'constructor'
  }
}

