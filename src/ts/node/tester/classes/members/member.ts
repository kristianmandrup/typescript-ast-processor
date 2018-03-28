import * as ts from 'typescript'
import { BaseTester } from '../../base'

import {
  createGetAccessorTester
} from './getter'
import {
  createSetAccessorTester
} from './setter'
import { IndentifierNodeTester } from '../../identifier';

export function createClassMemberTester(node: any, options: any = {}): BaseTester | undefined {
  return createGetAccessorTester(node, options) &&
    createSetAccessorTester(node, options)
}

export class MemberTester extends IndentifierNodeTester {

}
