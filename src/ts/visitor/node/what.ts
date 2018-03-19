import * as ts from 'typescript'

export class What {
  nodeTypes: any

  constructor(nodeTypes: any) {
    this.nodeTypes = nodeTypes
  }

  whatCategories(node: any, categories: string[] = ['all']) {
    return categories.reduce((acc: any, cat: string) => {
      acc[cat] = this.whatIs(node, cat)
      return acc
    }, {})
  }

  whatIs(node: any, category: string = 'all') {
    return this.nodeTypes[category].reduce((acc: any, type: string) => {
      const check = this.nodeTypes[type]
      const val = check ? check(node) : undefined
      if (val) {
        acc[type] = val
      }
      return acc
    }, {})
  }
}
