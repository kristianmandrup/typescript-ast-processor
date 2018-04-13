import { Loggable } from '../../loggable';
import {
  resolveArrayIteratorFindMethod,
  testOr,
  testAnd,
  testNot,
  testNames,
} from './util'
import { IDetailsTester } from '../details/base';

export interface INodeTester {
  parentBlocks?: any[]
  isNested?: boolean
  nestedLevels?: number

  test(query: any): boolean
  query(query: any): any
  info(): any
}

export abstract class BaseNodeTester extends Loggable implements INodeTester {
  factories: any = {}
  _occurenceTester: any // INodeOccurrenceTester

  /**
   * Create BaseTester
   * @param node
   * @param options
   */
  constructor(public node: any, options: any) {
    super(options)
    this.factories = options.factories
    if (!this.factories) {
      this.error('Missing factories in options', {
        options
      })
    }

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
   * Create new or return Occurrence Node Tester
   */
  get occurenceTester() {
    this._occurenceTester = this._occurenceTester || this.createNodeTester('occurrences', this.node, this.options)
    return this._occurenceTester
  }


  protected createTester(name: string, node: any, options: any = {}): INodeTester | IDetailsTester {
    const factory = /details:/.test(name) ? 'createDetailsTester' : 'createNodeTester'
    name = name.replace(/\w+:/, '')
    return this[factory](name, node, options)
  }

  /**
   * Convenience factory for creating a node tester
   * @param name
   * @param node
   * @param options
   */
  protected createCategoryTester(category: string, name: string, node: any, options: any = {}): any {
    const factoryCategory = this.factories[category]
    if (!factoryCategory) {
      this.error('Invalid factory category', {
        factories: this.factories,
        category,
        factoryCategory,
      })
    }
    return factoryCategory.createTester(name, node, options)
  }

  /**
   * Convenience factory for creating a node tester
   * @param name
   * @param node
   * @param options
   */
  protected createNodeTester(name: string, node: any, options: any = {}): INodeTester {
    return this.createCategoryTester('tester', name, node, options)
  }

  /**
   * Convenience factory for creating a node details tester
   * @param name
   * @param node
   * @param options
   */
  protected createDetailsTester(name: string, node: any, options: any = {}): IDetailsTester {
    return this.createCategoryTester('details', name, node, options)
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

  /**
   * Count occurences in sub tree(s) under this node
   * Call ASTNodeTraverser with traverseQuery to control which nodes to exclude/include in visit count
   * @param traverseQuery
   */
  countInTree(query: any): number {
    return this.occurenceTester.countInTree(query)
  }

  /**
   * Count occurences in subtree
   * TODO: extract and use from utility class
   * @param options
   */
  countOccurrence(options: any = {}): number {
    return this.occurenceTester.countOccurrence(options)
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
    return this.createNodeTester('list', node, options)
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

