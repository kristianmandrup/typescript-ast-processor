import * as ts from 'typescript'
import { BaseTester } from '../../base'
import {
  isMemberType
} from './types'

export function createPropertyTester(node: any, options: any = {}) {
  if (!isMemberType(node, 'property')) return
  return new PropertyTester(node, options)
}

export class PropertyTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }
}

