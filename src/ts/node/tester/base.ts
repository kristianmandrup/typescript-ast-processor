import * as ts from 'typescript'
import { NodeDetailsTester } from '../details/generic';

import { Loggable } from '../../loggable';
import { NodeTester } from '.';
import {
  arrayTestMethod,
  testOr,
  testNot
} from './util'

export interface INodeTester {
  tester: NodeTester
  details: NodeDetailsTester
}

export class BaseTester extends Loggable {
  $node: INodeTester
  node: any

  constructor(node: any, options: any) {
    super(options)
    if (!node) {
      this.error(`BaseTester: Missing node for tester`, {
        node,
        options,
        constructor: this.constructor.name
      })
    }

    this.node = node
    this.$node = {
      tester: new NodeTester(options),
      details: new NodeDetailsTester(options)
    }
  }

  get modifiers() {
    return this.node.modifiers || []
  }

  arrayTestMethod(obj: any): any {
    return arrayTestMethod(obj, this.options)
  }

  testNot(query: any, tester: Function) {
    return testNot(query, tester)
  }

  testOr(query: any, tester: Function) {
    return testOr(query, tester)
  }

  test(query: any): any {
    return true
  }

  testType(type: string): boolean {
    return Boolean(!type || this.validatePrimitiveType(type) && this.$node.details.is(this.node, type))
  }

  validatePrimitiveType(type: string): boolean {
    return this.primitiveTypes.includes(type)
  }

  get primitiveTypes() {
    return ['boolean', 'string', 'number', 'array', 'void']
  }
}

