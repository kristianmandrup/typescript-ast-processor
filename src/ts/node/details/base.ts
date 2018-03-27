import * as ts from 'typescript'
import { Loggable } from '../../loggable'
import {
  callFun,
  enumKeys,
  toList,
  isStr,
  isFunction
} from '../../util'
import {
  queryNode
} from '../tester/util/query'

export class BaseDetailsTester extends Loggable {
  modifierKey: string = 'modifiers'
  node: any
  syntaxMap: any = {}
  flagMap: any = {}
  funMap: any = {}

  protected _maps: any = {}

  constructor(options: any) {
    super(options)
    this.modifierKey = options.modifierKey || this.modifierKey
    this.node = options.node
  }

  get maps() {
    this._maps = this._maps || Object.assign({}, this.syntaxMap, this.flagMap)
    return this._maps
  }

  get checkerNames() {
    return Object.keys(this.maps)
  }

  get checkers() {
    this.funMap = this.funMap || this.checkerNames.reduce((acc: any, key: string) => {
      const fun = this[key]
      if (isFunction(fun)) {
        acc[key] = fun.bind(this)
      }
      return acc
    }, {})
    return this.funMap
  }

  forNode(node: any) {
    this.node = node
    return this
  }

  error(msg: string, data: any): boolean {
    super.error(msg, data)
    return false
  }

  get keys() {
    return enumKeys(ts.SyntaxKind)
  }

  nodeTypeCheckName(name: string) {
    return name[0].toLowerCase() + name.slice(1)
  }

  testNames(names: any, options: any = {}) {
    const node: ts.Node = this.nodeOf(options)
    const method = options.method === 'all' ? 'allOf' : 'anyOf'
    return this.test(node, {
      [method]: names
    })
  }

  modifiersOf(node: any, options: any = {}) {
    return node[options.modifierKey || this.modifierKey]
  }

  nodeOf(options: any = {}) {
    return options.node || this.node
  }

  findMatch(modifiers: any, modifier: ts.SyntaxKind) {
    modifiers = toList(modifiers)
    return modifiers.find((nodeModifier: any) => nodeModifier.kind === modifier)
  }

  isModifier(key: any) {
    return isStr(key) ? this.syntaxMap[key] : ts.SyntaxKind[key]
  }

  isFlag(key: any) {
    return isStr(key) ? this.flagMap[key] : ts.NodeFlags[key]
  }

  has(key: any, options: any = {}): boolean {
    if (this.isModifier(key)) return this.hasModifier(key, options)
    if (this.isFlag(key)) return this.hasFlag(key, options)
    return this.error(`has: unknown has key argument, must be a ts modifier or flag`, {
      key
    }) && false
  }

  hasModifier(key: ts.SyntaxKind | string, options: any = {}): boolean {
    const modifier: ts.SyntaxKind = isStr(key) ? this.syntaxMap[key] : key
    const node: ts.Node = this.nodeOf(options)
    const modifiers = this.modifiersOf(node, options)
    if (!modifiers) return false
    const result = this.findMatch(modifiers, modifier)
    return Boolean(result)
  }

  hasFlag(key: any, options: any = {}): boolean {
    const flag: ts.NodeFlags = isStr(key) ? this.flagMap[key] : key
    const node = this.nodeOf(options)
    if (!node.flags) return false
    // to test if a const: https://github.com/Microsoft/TypeScript/issues/22681#issuecomment-374002621
    // variableDeclarationList.flags & ts.NodeFlags.Const
    return Boolean(node.flags & flag)
  }

  test(query: any, options: any = {}) {
    const node: ts.Node = this.nodeOf(options)
    return queryNode(node, query, this.is.bind(this))
  }

  is(name: string, options: any = {}) {
    const node: ts.Node = this.nodeOf(options)
    name = this.nodeTypeCheckName(name)
    const fun = this.checkers[name]
    return callFun(fun, node)
  }
}

