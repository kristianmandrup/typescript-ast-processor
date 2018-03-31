import {
  createCountingASTNodeTraverser
} from '../../visitor/traverser'

import {
  toList,
  isEmpty,
  isFunction
} from '../../util'

export interface INodeOccurrenceTester {
  countInTree(query: any): number
  countOccurrence(options: any): number
}

export function createNodeOccurrenceTester(node: any, options: any = {}) {
  return new NodeOccurrenceTester(node, options)
}

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
   * query:
   *  - typesToCount
   *  - countNodeTypeChecker
   *  - excludeVisit
   *
   * @param traverseQuery
   */
  public countInTree(query: any): number {
    return this.createNodeTraverser({
      ...this.options,
      query,
      node: this.node
    }).counter.visited
  }

  public countOccurrence(options: any = {}): number {
    const {
      types,
      countNodeTypeChecker,
    } = options
    const typesToCount = toList(types)
    const traverseQuery: any = {
    }
    if (!isEmpty(types)) {
      traverseQuery.typesToCount = typesToCount
    }
    if (isFunction(countNodeTypeChecker)) {
      traverseQuery.countNodeTypeChecker = countNodeTypeChecker
    }
    const excludeVisit = options.excludeVisit || [/Declaration$/]
    if (!options.includeAll) {
      traverseQuery.excludeVisit = excludeVisit
    }
    return this.countInTree(traverseQuery)
  }

  protected createExpressionTester(options: any = {}) {
    return this.factories.details.createTester('expression', { ...options, node: this.node })
  }

  protected createExprTester(token: string = 'break', options: any = {}) {
    return (node: any) => {
      const exprTester = this.createExpressionTester({ ...options, node })
      return exprTester.is(token, node)
    }
  }

  protected countOccurenceOf(token: string, options: any = {}): number {
    return this.countOccurrence({
      tester: this.createExprTester(token, {
        ...options,
        exclude: ['loop'] // exclude any nested loops
      })
    })
  }
}

