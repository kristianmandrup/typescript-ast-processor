import * as ts from 'typescript'
import { BaseTester } from '../../base'
import {
  isMemberType
} from './types'

export function createConstructorTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'constructor')) return
  return new ConstructorTester(node, options)
}

export class ConstructorTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }
}

