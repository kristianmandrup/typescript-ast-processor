import * as ts from 'typescript'
import { BaseTester } from '../../base'
import {
  isMemberType
} from './types'

export function createGetAccessorTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'getter')) return
  return new GetAccessorTester(node, options)
}

export class GetAccessorTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }
}

