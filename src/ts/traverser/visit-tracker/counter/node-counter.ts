import * as deepmerge from 'deepmerge'
import {
  isEmpty,
  isArray,
  isFunction,
  isNonEmptyStr,
  isObject,
  // isDefined,
  lowercaseFirst
} from '../../../util'
import { Loggable } from '../../../loggable';

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

export interface INodeVisitCounter {
  visited: number,
  skipped: number,
  types: any
}

export class NodeTypeCounter extends Loggable {
  protected _nodeTypes: {
    toCount?: string[],
    fnToCount?: Function,
    toExcludeFromVisit?: string[],
    categories?: any
  }

  protected _nodeTypesToCheckFor: string[]
  categoryMap: any

  // registry used to count occurences of each type
  counter: INodeVisitCounter
  nodeTypes: any

  constructor(nodeTypes: any[], options: any) {
    super(options)
    this.nodeTypes = nodeTypes
  }

  reset() {
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

  init() {
    this.reset()
  }

  setNodeTypes(nodeTypes: any) {
    this._nodeTypes = deepmerge(this._nodeTypes || {}, nodeTypes)
    this.resolveTypeCategories()
  }

  /**
   * Get the counter (number >= 0) for a particular node type key
   * @param key
   */
  counterFor(key: string) {
    return this.counter[key] || 0
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
   * Increment a node counter
   * @param counterEntry
   */
  inc(key: string, counter?: any) {
    // if (isEmpty(key)) return
    counter = counter || this.counter
    const keyName = this.counterKeyFor(key)
    counter[keyName] = this.counterFor(keyName) + 1
    return this
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

  protected counterKeyFor(key: string) {
    if (!isNonEmptyStr(key)) {
      this.error('Invalid counter key', {
        key
      })
    }
    return lowercaseFirst(key)
  }
}
