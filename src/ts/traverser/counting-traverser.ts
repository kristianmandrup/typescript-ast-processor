import * as ts from 'typescript'
import * as deepmerge from 'deepmerge'
import {
  ASTNodeTraverser
} from './traverser'

import {
  isEmpty,
  isFunction,
  flatten,
  nodeTypeCheckName,
  lowercaseFirst,
  callFun
} from '../util'

export function createCountingASTNodeTraverser(options: any) {
  return new CountingASTNodeTraverser(options)
}

export interface INodeVisitCounter {
  visited: number,
  skipped: number,
  types: any
}

const defaults = {
  categoryMap: {
    'switch': [
      'SwitchStatement'
    ],
    'loop': [
      'IterationStatement'
      // 'ForStatement',
      // 'DoStatement',
      // 'WhileStatement'
    ],
    'condition': [
      'ConditionalExpression'
    ],
    'expression': [
      'Expression'
    ],
    'statement': [
      'Statement'
    ],
    'declaration': [
      'Declaration'
      // 'DeclarationStatement'
    ]
  }
}

export class CountingASTNodeTraverser extends ASTNodeTraverser {
  _nodeTypes: {
    toCount?: string[],
    fnToCount?: Function,
    toExcludeFromVisit?: string[],
    categories: any
  }


  fns: any // functions map
  _nodeTypesToCheckFor: string[]

  categoryMap: any

  // registry used to count occurences of each type
  counter: INodeVisitCounter = {
    visited: 0,
    skipped: 0,
    // types of node visited
    types: {
    }
  }

  /**
   * Initialize
   * @param options
   */
  init(options: any = {}) {
    this._nodeTypes = {
      categories: {
        toCount: [
          // always count:
          'statement',
          'declaration',
          'expression'
          // 'condition'
        ]
      }
    }
    this.categoryMap = defaults.categoryMap
    super.init(options)
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
    this._nodeTypes = deepmerge(this._nodeTypes || {}, nodeTypes)
    this.resolveTypeCategories()
    return this
  }


  /**
   * Resolve type categories to be exluded
   */
  protected resolveTypeCategories(): string[] | undefined {
    const categories = this.nodeTypes.categories
    if (isEmpty(categories)) return
    const categoryNames = Object.keys(categories)
    return categoryNames.map(key => {
      const resolvedList = this.resolveCategoryKey(key)
      this.nodeTypes[key] = this.nodeTypes[key] || []
      return this.nodeTypes[key].concat(resolvedList)
    })
  }

  /**
   * Resolve list for category key, such as
   * @param key
   */
  protected resolveCategoryKey(key: string) {
    let list: string[] = this.nodeTypes.categories[key] || []
    const resolveTypeCategoryFun = this.resolveTypeCategory.bind(this)
    if (isEmpty(list)) return []

    // TODO: test that this is the way...
    list = Array.isArray(list) ? list : Object.keys(list)
    return flatten(list.map(resolveTypeCategoryFun))
  }

  /**
   * Resolve type category
   * @param categoryName
   */
  protected resolveTypeCategory(categoryName: string) {
    return this.categoryMap[categoryName]
  }

  protected counterKeyFor(key: string) {
    return lowercaseFirst(key)
  }

  /**
   * Increment a node counter
   * @param counterEntry
   */
  protected inc(key: string, counter?: any) {
    if (isEmpty(key)) return
    counter = counter || this.counter
    const keyName = this.counterKeyFor(key)
    counter[keyName] = (counter[keyName] || 0) + 1
  }


  /**
   * Handler for when node visiting was skipped
   * @param node
   */
  protected skipped(node: any) {
    super.skipped(node)
    this.inc('skipped')
  }

  /**
   * Find the list of node types to check for
   */
  protected get resolveNodeTypesToCheckFor() {
    return this.nodeTypes.toCount.concat(this.nodeTypes.toExcludeFromVisit)
  }

  /**
   * return cached list of node types to check for
   */
  protected get nodeTypesToCheckFor() {
    this._nodeTypesToCheckFor = this._nodeTypesToCheckFor || this.resolveNodeTypesToCheckFor
    return this._nodeTypesToCheckFor
  }

  /**
   * Use iterate through node types to check for and see if this node matches any of those types
   * @param node
   */
  protected typeOf(node: any): string | undefined {
    let fnName
    const typeName = this.nodeTypesToCheckFor.find(type => {
      fnName = nodeTypeCheckName(type)
      const fn = ts[fnName]
      return callFun(fn, node)
    })
    return typeName && this.typeNameFor(typeName, fnName)
  }

  /**
   * Resolve the list of
   * @param nodeTypes
   * @param node
   */
  protected checkIfNodeToBeCounted(node: any): boolean {
    const { fnToCount, toCount } = this.nodeTypes
    const { nodeType } = node
    if (isFunction(fnToCount)) {
      return fnToCount(nodeType)
    }
    if (isEmpty(toCount)) return true
    return toCount.includes(nodeType)
  }

  protected shouldCountNode(node: any): boolean {
    return this.checkIfNodeToBeCounted(node)
  }

  /**
   * Count type of visited node if in include list of nodes to count
   * @param node
   */
  protected countVisitedNodeType(node: any) {
    if (this.shouldCountNode(node)) {
      this.inc(node.nodeType, this.counter.types)
    }
  }

  /**
   * Handler for just after node was visited
   * @param node
   */
  protected wasVisited(node: any) {
    super.wasVisited(node)
    this.inc('visited')
    this.visitedNodes.push(node)
  }

  /**
   *
   * @param node
   */
  protected shouldExcludeNodeFromVisit(node: any) {
    const { toExcludeFromVisit } = this.nodeTypes
    return !isEmpty(toExcludeFromVisit) && toExcludeFromVisit.includes(node.nodeType)
  }

  /**
   * Determine if traverser should visit this node
   * @param node
   */
  protected shouldVisitNode(node: any) {
    if (this.shouldExcludeNodeFromVisit(node.nodeType)) return false
    return super.shouldVisitNode(node)
  }
}
