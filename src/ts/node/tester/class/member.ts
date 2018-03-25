import { FunctionLikeTester } from '../function'

export function createClassMemberTester(node: any, options: any = {}) {
  return new ClassMemberTester(node, options)
}

export class ClassMemberTester extends FunctionLikeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }
}
