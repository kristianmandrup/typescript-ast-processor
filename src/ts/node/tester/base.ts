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

export abstract class BaseTester extends Loggable {
  node: any
  typeTester: TypeTester

  /**
   * Create BaseTester
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(options)
    if (!node) {
      this.error(`BaseTester: Missing node to test`, {
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

  /**
   * Create a tester object to test a list of nodes
   * @param node
   * @param options
   */
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

  /**
   * Boolean NOT condition on query (or result)
   * @param query
   * @param tester
   */
  testNot(query: any, tester: Function) {
    return testNot(query, tester)
  }

  /**
   * Boolean OR condition on one or more queries (or results)
   * @param query
   * @param tester
   */
  testOr(query: any, tester: Function) {
    return testOr(query, tester)
  }

  /**
   * Perform query on node
   * @param query
   */
  test(query: any): any {
    return true
  }

  /**
   * Test node type
   * @param type
   */
  testType(type: string): boolean {
    return Boolean(!type || this.validatePrimitiveType(type) && this.typeTester.forNode(this.node).is(type))
  }

  /**
   * Validate if type (to test) is a primitive type
   * @param type
   */
  validatePrimitiveType(type: string): boolean {
    return this.primitiveTypes.includes(type)
  }

  /**
   * List of primitive types (used by validation)
   * Note: Should match node details type tester
   */
  get primitiveTypes() {
    return ['boolean', 'string', 'number', 'array', 'void', 'any', 'object']
  }
}

