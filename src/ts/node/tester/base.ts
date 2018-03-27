import { Loggable } from '../../loggable';
import {
  resolveArrayIteratorFindMethod,
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

  /**
   * Many node tests are on modifiers collection
   * Used a lot in node details testers
   */
  get modifiers() {
    return this.node.modifiers || []
  }

  createListTester(node: any, options: any = {}) {
    return new ListTester(node, options)
  }

  /**
   * Create a tester object using ListTester to test a collection for matching names
   * @param options
   */
  createTesterFor(options: any) {
    const createNamesTester = (nodes: any[]) => {
      return (queryExpr: any) => testNames(nodes, queryExpr)
    }
    const createTester = options.createTester || createNamesTester
    return this.createListTester(this.node, Object.assign(options, {
      createTester
    }))
  }

  /**
   * Create tester for testing items and test using query
   * By default creates a name tester
   * You can override by passing a createTester factory function
   * A custom factory function must take a nodes collection as argument
   * the function must return a function that takes a query expression argument
   * and returns a query result on the nodes
   * @param items set of nodes to query
   * @param query the query expression
   */
  queryItems(items: any[], query: any, options: any = {}) {
    options = Object.assign(options, { items })
    return this.createTesterFor(options).test(query)
  }

  /**
   * return a generic method to test an array-like structure
   * @param obj
   */
  arrayIteratorFindMethod(obj: any): any {
    return resolveArrayIteratorFindMethod(obj, this.options)
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

