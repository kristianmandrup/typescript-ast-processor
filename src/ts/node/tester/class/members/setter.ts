import * as ts from 'typescript'
import { BaseTester } from '../../base'
import {
  isMemberType
} from './types'


export function createSetAccessorTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'setter')) return
  return new SetAccessorTester(node, options)
}

export class SetAccessorTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }
}

