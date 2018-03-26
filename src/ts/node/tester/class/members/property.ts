import * as ts from 'typescript'
import {
  isMemberType
} from './types'
import { MemberTester } from './member';

export function createPropertyTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'property')) return
  return new PropertyTester(node, options)
}

export class PropertyTester extends MemberTester {
  constructor(node: any, options: any) {
    super(node, options)
  }
}

