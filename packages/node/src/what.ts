import * as ts from 'typescript'
import {
  isStr,
  isArray,
  isObject,
  isFunction
} from '../util'
import { Typer } from './typer';

export class What {
  nodeTypes: any
  typer: Typer

  constructor(nodeTypes: any) {
    this.nodeTypes = nodeTypes
    this.typer = new Typer(nodeTypes)
  }

  /**
   * Return map of categories that match the node
   * @param node
   * @param categories
   */
  categories(node: any, categories: string[] = ['all']) {
    return categories.reduce((acc: any, cat: string) => {
      acc[cat] = this.is(node, cat)
      return acc
    }, {})
  }

  /**
   * Get a sub-category by dot path
   * @param dotPath
   */
  categoryOf(dotPath: string) {
    return dotPath === 'all' ? this.nodeTypes.all : this.typer.typesOfPath(dotPath)
  }

  /**
   * Determine what the node is by recursing through all categorized node types
   * @param node
   * @param category
   */
  is(node: any, category: any = 'all') {
    const catVal = isStr(category) ? this.categoryOf(category) : category
    return this.recurse(node, catVal)
  }

  /**
   * Recurse deeply nested struture
   * @param node
   * @param value
   */
  recurse(node: any, value: any) {
    if (isStr(value)) return this.checkCatStr(node, value)
    if (isArray(value)) return this.checkCatList(node, value)
    if (isObject(value)) return this.checkCatObj(node, value)
    return value
  }

  /**
   * Check category list of types
   * @param node
   * @param catList
   */
  checkCatList(node: any, catList: any) {
    return catList.map((catItem: any) => this.recurse(node, catItem))
  }

  /**
   * Check single category type string by calling
   * f.ex typescript isFunctionDeclaration function for FunctionDeclaration type
   * @param node
   * @param typeCheck
   */
  checkCatStr(node: any, typeCheck: string) {
    const check = isStr(typeCheck) ? ts[`is${typeCheck}`] : undefined
    return isFunction(check) ? check(node) : undefined
  }

  /**
   * Recurse category map (object) of types
   * @param node
   * @param catObj
   */
  checkCatObj(node: any, catObj: any) {
    return Object.keys(catObj).reduce((acc: any, type: string) => {
      const value = catObj[type]
      const val = this.recurse(node, value)
      if (val) {
        acc[type] = val
      }
      return acc
    }, {})
  }
}
