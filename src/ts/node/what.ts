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

  categories(node: any, categories: string[] = ['all']) {
    return categories.reduce((acc: any, cat: string) => {
      acc[cat] = this.is(node, cat)
      return acc
    }, {})
  }

  categoryOf(dotPath: string) {
    return dotPath === 'all' ? this.nodeTypes.all : this.typer.typesOfPath(dotPath)
  }

  is(node: any, category: any = 'all') {
    const catVal = isStr(category) ? this.categoryOf(category) : category
    return this.recurse(node, catVal)
  }

  recurse(node: any, value: any) {
    if (isStr(value)) return this.checkCatStr(node, value)
    if (isArray(value)) return this.checkCatList(node, value)
    if (isObject(value)) return this.checkCatObj(node, value)
    return value
  }

  checkCatList(node: any, catList: any) {
    return catList.map((catItem: any) => this.recurse(node, catItem))
  }

  checkCatStr(node: any, typeCheck: string) {
    const check = isStr(typeCheck) ? ts[`is${typeCheck}`] : undefined
    return isFunction(check) ? check(node) : undefined
  }

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
