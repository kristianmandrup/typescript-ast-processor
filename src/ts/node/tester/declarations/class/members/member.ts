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
  constructor(node: any, options: any) {
    super(node, options)
  }

}
