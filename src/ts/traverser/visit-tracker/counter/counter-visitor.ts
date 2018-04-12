import * as ts from 'typescript'
import {
  ASTNodeTraverser
} from '../../base'

import {
  NodeTypeCounter
} from './node-counter'

import {
  isEmpty,
  isArray,
  isFunction,
  isNonEmptyStr,
  isObject,
  // isDefined,
  lowercaseFirst
} from '../../../util'

export function createCountingASTNodeTraverser(options: any) {
  return new CountingASTNodeTraverser(options)
}

export class CountingASTNodeTraverser extends ASTNodeTraverser {
  fns: any // functions map
  nodeTypeCounter: NodeTypeCounter

  constructor(options: any) {
    super(options)
    this.nodeTypeCounter = new NodeTypeCounter(this.nodeTypes, options)
  }

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
    this.nodeTypeCounter.init()
  }

  inc(key: string, counter?: any): any {
    this.nodeTypeCounter.inc(key, counter)
    return this
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
    let {
      nodeTypes
    } = query
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
   * return cached list of node types to check for
   */
  protected get nodeTypesToCheckFor(): any[] {
    this._nodeTypesToCheckFor = this._nodeTypesToCheckFor || this.resolveNodeTypesToCheckFor
    return this._nodeTypesToCheckFor
  }

  /**
   * Use iterate through node types to check for and see if this node matches any of those types
   * @param node
   */
  protected typeOf(node: any): string {
    return super.typeOf(node)
    // let fnName
    // const typeName = this.nodeTypesToCheckFor.find(type => {
    //   fnName = nodeTypeCheckName(type)
    //   const fn = ts[fnName]
    //   return callFun(fn, node)
    // })
    // return typeName && this.typeNameFor(typeName, fnName) || 'unknown'
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
