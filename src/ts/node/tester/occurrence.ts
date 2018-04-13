import {
  createCountingASTNodeTraverser
} from '../../traverser'

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
export class NodeOccurrenceTester {
  protected factories: any

  constructor(protected node: any, protected options: any = {}) {
    this.factories = options.factories

  }

  /**
   * Create a Node traverser for additional information gathering in subtrees,
   * such as counting specific nodes
   * @param options
   */
  createNodeTraverser(options: any = {}) {
    const createNodeTraverser = options.createNodeTraverser || createCountingASTNodeTraverser
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
   *    - exclude
   *
   * @param traverseQuery
   */
  countInTree(query: any): number {
    const opts = {
      ...this.options,
      query,
      node: this.node
    }
    // TODO: fix/improve
    const nodeTraverser = this.createNodeTraverser(opts)
    nodeTraverser.visit()
    const counter = nodeTraverser.counter || {}
    return counter.visited || 0
  }

  /**
   * Counts occurences
   * By default excludes any declaration from consideration unless includeAll is set
   * Calls countInTree
   * @param options
   */
  countOccurrence(options: any = {}): number {
    let {
      nodeTypes
    } = options
    nodeTypes = nodeTypes || {}
    if (!options.includeAll) {
      // default categories to exclude
      nodeTypes.exclude = nodeTypes.exclude || ['declaration']
    }
    return this.countInTree({
      nodeTypes
    })
  }

  /**
   *
   * @param options
   */
  // protected
  createExpressionTester(options: any = {}) {
    return this.factories.details.createTester('expression', { ...options, node: this.node })
  }

  // protected
  createExprTester(token: string = 'break', options: any = {}) {
    return (node: any) => {
      const exprTester = this.createExpressionTester({ ...options, node })
      return exprTester.is(token, node)
    }
  }

  // protected
  countOccurenceOf(token: string, options: any = {}): number {
    return this.countOccurrence({
      tester: this.createExprTester(token, {
        ...options,
        exclude: ['loop'] // exclude any nested loops
      })
    })
  }
}

