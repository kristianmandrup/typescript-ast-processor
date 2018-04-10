import * as ts from 'typescript'
import { BaseNodeTester } from '../../base'

import {
  createGetAccessorTester
} from './getter'
import {
  createSetAccessorTester
} from './setter'
import { IndentifierNodeTester } from '../../identifier';

export function createClassMemberTester(node: any, options: any = {}): BaseNodeTester | undefined {
  //new MemberTester(node, options)
  return createGetAccessorTester(node, options) &&
    createSetAccessorTester(node, options)

}

export class MemberTester extends IndentifierNodeTester {

}
