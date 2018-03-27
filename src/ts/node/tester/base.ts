import * as ts from 'typescript'
import { Loggable } from '../../loggable';
import { NodeTester } from '.';
import {
  arrayTestMethod,
  testOr,
  testNot,
  testNames
} from './util'
import {
  ListTester
} from './generic'
import { TypeTester } from '../details/type';

export class BaseTester extends Loggable {
  node: any
  typeTester: TypeTester

  constructor(node: any, options: any) {
    super(options)
    if (!node) {
      this.error(`BaseTester: Missing node for tester`, {
        node,
        options,
        constructor: this.constructor.name
      })
    }
    this.typeTester = new TypeTester(options)
    this.node = node
  }

  get modifiers() {
    return this.node.modifiers || []
  }

  createNamesTesterFor(options: any) {
    return new ListTester(this.node, Object.assign(options, {
      createTester: (nodes: any[]) => {
        return (queryExpr: any) => testNames(nodes, queryExpr)
      }
    }))
  }

  queryItems(items: any[], query: any) {
    return this.createNamesTesterFor({ items }).test(query)
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
    return Boolean(!type || this.validatePrimitiveType(type) && this.typeTester.forNode(this.node).is(type))
  }

  validatePrimitiveType(type: string): boolean {
    return this.primitiveTypes.includes(type)
  }

  get primitiveTypes() {
    return ['boolean', 'string', 'number', 'array', 'void']
  }
}

