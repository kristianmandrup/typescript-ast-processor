import * as deepmerge from 'deepmerge'
import {
  isEmpty,
  isFunction,
  isNonEmptyStr,
  lowercaseFirst
} from '../../../../util'
import { Loggable } from '../../../../loggable';
import { createNodeTypeCategories, NodeTypeCategories } from '../node-type-categories';

export function createNodeTypeCounter(nodeTypes: any[], options: any = {}) {
  return new NodeTypeCounter(nodeTypes, options)
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

  // registry used to count occurences of each type
  counter: INodeVisitCounter
  nodeTypes: any
  categoryNodeTypes: NodeTypeCategories

  constructor(nodeTypes: any, options: any = {}) {
    super(options)
    this.nodeTypes = nodeTypes
    this.categoryNodeTypes = createNodeTypeCategories(nodeTypes.categories, options)
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
    this.resolveTypeCategories(nodeTypes)
  }

  resolveTypeCategories(nodeTypes: any) {
    this.categoryNodeTypes.resolveTypeCategories(nodeTypes)
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
  checkIfNodeToBeCounted(node: any): boolean {
    const { fnToCount, toCount } = this.nodeTypes
    const { nodeType } = node
    if (isFunction(fnToCount)) {
      return fnToCount(nodeType)
    }
    if (isEmpty(toCount)) return true
    return toCount.includes(nodeType)
  }

  shouldCountNode(node: any): boolean {
    return this.checkIfNodeToBeCounted(node)
  }

  /**
   * Count type of visited node if in include list of nodes to count
   * @param node
   */
  countVisitedNodeType(node: any) {
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
   * Resolve counter key (first letter lowercase)
   * @param key
   */
  counterKeyFor(key: string) {
    if (!isNonEmptyStr(key)) {
      this.error('Invalid counter key', {
        key
      })
    }
    return lowercaseFirst(key)
  }
}
