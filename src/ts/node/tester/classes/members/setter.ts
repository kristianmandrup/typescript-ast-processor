import * as ts from 'typescript'
import {
  isMemberType
} from './types'
import { MethodLikeTester } from './method-like';

export function createSetAccessorTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'setter')) return
  return new SetAccessorTester(node, options)
}

export class SetAccessorTester extends MethodLikeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }
}

