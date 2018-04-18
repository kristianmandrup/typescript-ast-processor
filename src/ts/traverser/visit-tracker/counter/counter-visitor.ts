import { ASTNodeTraverser } from '../../base'

import { NodeTypeCounter } from './node-type-counter'

import { isEmpty } from '../../../util'

export function createCountingASTNodeTraverser(options: any) {
  return new CountingASTNodeTraverser(options)
}

export class CountingASTNodeTraverser extends ASTNodeTraverser {
  fns: any // functions map
  nodeTypeCounter: NodeTypeCounter
  nodeTypesToCheckFor: string[]

  /**
   * Create AST node traverser that counts and tracks nodes of each type
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
  }

  /**
   * Reset traverser
   */
  reset() {
    super.reset()
    this.fns = {}
  }

  /**
   * Initialize
   * @param options
   */
  init(options: any = {}) {
    super.init(options)
    this.nodeTypeCounter = new NodeTypeCounter(this.nodeTypes, options)
    this.nodeTypeCounter.init()
    this.nodeTypesToCheckFor = this.resolveNodeTypesToCheckFor
    this.parseQuery(options.query)
  }

  /**
   * Increase node tyoe counter
   * @param key
   * @param counter
   */
  inc(key: string, counter?: any): any {
    this.nodeTypeCounter.inc(key, counter)
    return this
  }

  /**
   * The counter map for node types counted
   */
  get counter() {
    return this.nodeTypeCounter.counter
  }

  /**
   * query:
   * query:
   *  - typesToCount
   *  - typeChecker
   *  - toExcludeFromVisit
   *  - exclude
   *
   * @param query
   */
  parseQuery(query: any = {}) {
    let { nodeTypes } = query
    nodeTypes = nodeTypes || {}
    let categories = nodeTypes.categories
    nodeTypes.categories = categories || {}
    if (query.exclude) {
      categories.toExcludeFromVisit = categories.toExcludeFromVisit || []
      categories.toExcludeFromVisit.concat(query.exclude)
      query.nodeTypes.categories = categories
    }
    // TODO: configure NodeTypeCounter
    this.nodeTypeCounter.setNodeTypes(query.nodeTypes)

    return this
  }

  /**
   * Handler for when node visiting was skipped
   * @param node
   */
  protected skipped(node: any): any {
    super.skipped(node)
    this.inc('skipped')
  }

  /**
   * Find the list of node types to check for
   * Includes:
   * - types to count
   * - types to be excluded from visit
   */
  protected get resolveNodeTypesToCheckFor(): any[] {
    let toCount = this.nodeTypes.toCount || []
    return toCount.concat(this.nodeTypes.toExcludeFromVisit || [])
  }

  /**
   * Get a counter for a specific node type
   * @param key
   */
  counterFor(key: string) {
    return this.nodeTypeCounter.counterFor(key)
  }

  /**
   * Handler for just after node was visited
   * @param node
   */
  protected wasVisited(node: any): any {
    super.wasVisited(node)
    this.inc('visited')
    this.visitedNodes.push(node)
    return this
  }

  /**
   *
   * @param node
   */
  protected shouldExcludeNodeFromVisit(node: any) {
    const { toExcludeFromVisit } = this.nodeTypes
    if (isEmpty(toExcludeFromVisit)) return false
    const nodeType = node.nodeType || node
    if (!nodeType || nodeType === 'unknown') return false
    return toExcludeFromVisit.includes(nodeType)
  }

  /**
   * Determine if traverser should visit this node
   * @param node
   */
  protected shouldVisitNode(node: any) {
    const shouldExclude = this.shouldExcludeNodeFromVisit(node)
    if (shouldExclude) return false
    const shouldVisit = super.shouldVisitNode(node)
    return shouldVisit
  }
}
