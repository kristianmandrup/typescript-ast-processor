import { Loggable } from '../../loggable';
import {
  resolveArrayIteratorFindMethod,
  testOr,
  testAnd,
  testNot,
  testName,
  testNames,
} from './util'
import {
  ListTester
} from './generic'
import {
  toList,
  isEmpty,
  isFunction
} from '../../util'
import {
  createASTNodeTraverser
} from '../../visitor'

export interface INodeTester {
  test(query: any): boolean
  query(query: any): any
  info(): any
}

export abstract class BaseNodeTester extends Loggable implements INodeTester {
  node: any
  factories: any = {}

  /**
   * Create BaseTester
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(options)
    this.factories = this.testerFactories
    if (!node) {
      this.error(`BaseTester: Missing node to test`, {
        node,
        options,
        constructor: this.constructor.name
      })
    }
    this.node = node
  }

  /**
   * Perform query on node and return true if full query (ie. all sub-queries pass) or false otherwise
   * Subclass should always override or extend
   * @param query
   */
  public test(query: any): any {
    return true
  }

  /**
   * Perform query, returning reduce name/value result with each sub-query result
   * Subclass should always override or extend
   * @returns { Object } node information
   */
  public query(query: any): any {
    return {}
  }

  /**
   * Return object with node information
   * Subclass should always override or extend
   * @returns { Object } node information
   */
  public info(): any {
    return {}
  }

  get testerFactories() {
    let factories = this.options.factories || {}
    factories = factories.tester || factories
    return isEmpty(factories) ? this.factories : factories
  }

  /**
   * Create a Node traverser for additional information gathering in subtrees,
   * such as counting specific nodes
   * @param options
   */
  createNodeTraverser(options: any = {}) {
    return createASTNodeTraverser(options)
  }

  /**
   * Count occurences in sub tree(s) under this node
   * Call ASTNodeTraverser with traverseQuery to control which nodes to exclude/include in visit count
   * @param traverseQuery
   */
  countInTree(query: any): number {
    return this.createNodeTraverser({
      ...this.options,
      query,
      node: this.node
    }).counter.visited
  }

  countOccurrence(options: any = {}): number {
    const {
      types,
      typeChecker,
    } = options
    const typesToCount = toList(types)
    const traverseQuery: any = {
    }
    if (!isEmpty(types)) {
      traverseQuery.typesToCount = typesToCount
    }
    if (isFunction(typeChecker)) {
      traverseQuery.typeChecker = typeChecker
    }
    const excludeVisit = options.excludeVisit || [/Declaration$/]
    if (!options.includeAll) {
      traverseQuery.excludeVisit = excludeVisit
    }
    return this.countInTree(traverseQuery)
  }

  /**
   * Querying number of specific items such as cases, statements, blocks etc
   * @param query
   * @param count
   */
  testCount(query: any, count: number) {
    query = query.count || query

    // normalize
    query.min = query.min || 0
    query.max = query.max || 999

    if (count < query.min) return false
    if (count > query.max) return false
    if (query.eq && query.eq !== count) return false
    return true
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
  protected testNot(query: any, tester: Function) {
    return testNot(query, tester)
  }

  /**
   * Boolean OR condition on one or more queries (or results)
   * @param query
   * @param tester
   */
  protected testOr(query: any, tester: Function) {
    return testOr(query, tester)
  }
}

