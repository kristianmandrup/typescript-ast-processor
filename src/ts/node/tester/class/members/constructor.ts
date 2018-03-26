import * as ts from 'typescript'
import {
  isMemberType
} from './types'
import { MethodLikeTester } from './method-like';

export function createConstructorTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'constructor')) return
  return new ConstructorTester(node, options)
}

export class ConstructorTester extends MethodLikeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }
}

