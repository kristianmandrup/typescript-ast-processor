import { Loggable } from '../../../_loggable'
import { isEmpty, isObject } from '../../../_util'

import { defaults, flattenObjToList } from './utils'

export function createNodeTypeCategories(categories: any, options: any = {}) {
  return new NodeTypeCategories(categories, options)
}

export class NodeTypeCategories extends Loggable {
  categoryMap: any

  /**
   * Create node type category resolver
   * @constructor
   * @param categories
   * @param options
   */
  constructor(public categories: any, options: any = {}) {
    super(options)

    if (isEmpty(categories)) {
      this.log('Warning: no categories', {
        categories,
      })
    }
  }

  /**
   * Initialize category map
   */
  init() {
    this.categoryMap = defaults.categoryMap
  }

  /**
   * Resolve list for category key, such a loop.for
   * @param key
   */
  resolveCategoryKey(key: string) {
    const keyPaths = key.split('.')
    const categories = this.categories

    let category: any[] =
      keyPaths.reduce((acc, path) => {
        acc = isObject(acc) ? acc[path] || [] : []
        return acc
      }, categories) || []

    if (isEmpty(category)) return []

    return flattenObjToList(category)
  }

  /**
   * Resolve type categories to be exluded
   */
  resolveTypeCategories(nodeTypes: any): any[] | undefined {
    const categories = this.categories
    if (isEmpty(categories)) return
    const categoryNames = Object.keys(categories)
    return categoryNames.map((key) => {
      const resolvedList = this.resolveCategoryKey(key)
      if (isEmpty(resolvedList)) {
        return {}
      }
      nodeTypes[key] = nodeTypes[key] || []
      nodeTypes[key].concat(resolvedList)
      const keyList = nodeTypes[key]
      return {
        [key]: keyList,
      }
    })
  }
}
