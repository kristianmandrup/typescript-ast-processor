import * as ts from 'typescript'
import * as deepmerge from 'deepmerge'
import {
  ASTNodeTraverser
} from './traverser'

import {
  isEmpty,
  isArray,
  isFunction,
  isNonEmptyStr,
  isObject,
  // isDefined,
  lowercaseFirst
} from '../util'

function resolveValueToList(val: any): any[] {
  if (isArray(val)) return val
  if (isObject(val)) return flattenObjToList(val)
  return []
}

function flattenObjToList(value: any): any[] {
  if (Array.isArray(value)) return value
  return Object.keys(value).reduce((acc: any[], key: string) => {
    const val = value[key]
    const list = resolveValueToList(val)
    acc = acc.concat(list)
    return acc
  }, [])
}

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
  protected _nodeTypes: {
    toCount?: string[],
    fnToCount?: Function,
    toExcludeFromVisit?: string[],
    categories?: any
  }


  fns: any // functions map
  protected _nodeTypesToCheckFor: string[]

  categoryMap: any

  // registry used to count occurences of each type
  counter: INodeVisitCounter

  reset() {
    super.reset()
    this.fns = {}
    this.categoryMap = defaults.categoryMap
    this._nodeTypesToCheckFor = []
    this.counter = {
      visited: 0,
      skipped: 0,
      // types of node visited
      types: {
      }
    }
  }

  /**
   * Initialize
   * @param options
   */
  init(options: any = {}) {
    this.reset()
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
   * Get the counter (number >= 0) for a particular node type key
   * @param key
   */
  counterFor(key: string) {
    return this.counter[key] || 0
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
  protected resolveTypeCategories(): any[] | undefined {
    const categories = this.nodeTypes.categories
    if (isEmpty(categories)) return
    const categoryNames = Object.keys(categories)
    return categoryNames.map(key => {
      const resolvedList = this.resolveCategoryKey(key)
      if (isEmpty(resolvedList)) {
        return {}
      }
      this.nodeTypes[key] = this.nodeTypes[key] || []
      this.nodeTypes[key].concat(resolvedList)
      const keyList = this.nodeTypes[key]
      return {
        [key]: keyList
      }

    })
  }

  /**
   * Resolve list for category key, such a loop.for
   * @param key
   */
  protected resolveCategoryKey(key: string) {
    const keyPaths = key.split('.')
    const categories = this.nodeTypes.categories
    if (isEmpty(categories)) {
      this.log('Warning: no categories', {
        nodeTypes: this.nodeTypes
      })
    }

    let category: any[] = keyPaths.reduce((acc, path) => {
      acc = isObject(acc) ? acc[path] || [] : []
      return acc
    }, categories) || []

    if (isEmpty(category)) return []

    return flattenObjToList(category)
  }

  protected counterKeyFor(key: string) {
    if (!isNonEmptyStr(key)) {
      this.error('Invalid counter key', {
        key
      })
    }
    return lowercaseFirst(key)
  }

  /**
   * Increment a node counter
   * @param counterEntry
   */
  protected inc(key: string, counter?: any) {
    // if (isEmpty(key)) return
    counter = counter || this.counter
    const keyName = this.counterKeyFor(key)
    counter[keyName] = this.counterFor(keyName) + 1
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
