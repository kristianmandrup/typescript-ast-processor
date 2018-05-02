import { createCountingASTNodeTraverser } from '@tecla5/qast-traverser'
import { isNonEmptyStr, isEmpty } from './_util'
import { BaseNodeTester } from './base'

export interface INodeOccurrenceTester {
  countInTree(query: any): number
  countOccurrence(options: any): number
}

export function createNodeOccurrenceTester(node: any, options: any = {}) {
  return new NodeOccurrenceTester(node, options)
}

/**
 * Counts occurences of specific types (or categories) of nodes
 * Within an AST sub-structure
 */
export class NodeOccurrenceTester extends BaseNodeTester {
  factories: any

  constructor(node: any, options: any = {}) {
    super(node, options)
    this.factories = options.factories
  }

  /**
   *
   * @param nodeType
   */
  findFirst(nodeType: any) {
    return this.createNodeTraverser(this.options).findFirst(nodeType)
  }

  /**
   * Create a Node traverser for additional information gathering in subtrees,
   * such as counting specific nodes
   * @param options
   */
  createNodeTraverser(options: any = {}) {
    const createNodeTraverser =
      options.createNodeTraverser || createCountingASTNodeTraverser
    return createNodeTraverser(options)
  }

  /**
   * Count occurences in sub tree(s) under this node
   * Call ASTNodeTraverser with traverseQuery to control which nodes to exclude/include in visit count
   *
   * TODO: Needs improvement/fix
   *
   * query:
   *  - nodeTypes:
   *    - toCount
   *    - toExclude
   *
   * @param traverseQuery
   */
  countInTree(query: any, type: string = 'visited'): number {
    const opts = {
      ...this.options,
      query,
      node: this.node,
    }
    const counter = this.counter(opts)
    return counter[type] || 0
  }

  /**
   * Visit all nodes in AST sub-tree
   * @param opts
   */
  visited(opts = {}) {
    const nodeTraverser = this.createNodeTraverser(opts)
    nodeTraverser.visit()
    return nodeTraverser
  }

  /**
   * Get the traverse counter map after having visited all nodes in AST sub-tree
   * @param opts
   */
  counter(opts = {}) {
    return this.visited(opts).counter || {}
  }

  /**
   * Counts occurences
   * By default excludes any declaration from consideration unless includeAll is set
   * Calls countInTree
   * @param options
   */
  countOccurrence(options: any = {}): number {
    let { nodeTypes } = options
    nodeTypes = nodeTypes || {}
    if (!options.includeAll) {
      // default categories to exclude
      nodeTypes.exclude = nodeTypes.exclude || ['declaration']
    }
    if (isEmpty(nodeTypes)) {
      this.error('Warning: empty nodeTypes - nothing to count')
      return 0
    }

    return this.countInTree({
      nodeTypes,
    })
  }

  /**
   *
   * @param options
   */
  // protected
  createExpressionTester(options: any = {}) {
    return this.factories.details.createTester('expression', {
      ...options,
      node: this.node,
    })
  }

  // protected
  /**
   * Count occurences of a particular token
   * @param token
   * @param options
   */
  countOccurenceOf(token: string, options: any = {}): number {
    return this.countOccurrence({
      nodeTypes: {
        // function that given a node determines if it should be counted or not
        toCount: this.createTokenTester(token, options),
      },
    })
  }

  /**
   * Create a token tester
   * @param token
   * @param options
   */
  createTokenTester(token: string, options: any = {}) {
    return this.createTokenTesterFun(token, {
      ...options,
      exclude: ['loop'], // exclude any nested loops
    })
  }

  // protected
  /**
   * Create an expression tester function
   * @param token
   * @param options
   */
  createTokenTesterFun(token: string, options: any = {}) {
    if (!isNonEmptyStr(token)) {
      this.error('Invalid or missing token', {
        token,
      })
    }
    return (node: any) => {
      const exprTester = this.createExpressionTester({ ...options, node })
      return exprTester.is(token, node)
    }
  }
}
