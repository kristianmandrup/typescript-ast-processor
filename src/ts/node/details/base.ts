import * as ts from 'typescript'
import { Loggable } from '../../loggable'
import {
  callFun,
  enumKeys,
  toList
} from '../../util'
import {
  queryNode
} from '../tester/util/query'

export class BaseDetailsTester extends Loggable {
  checkers: any = {}
  modifierKey: string = 'modifiers'
  node: any

  constructor(options: any) {
    super(options)
    this.modifierKey = options.modifierKey || this.modifierKey
    this.node = options.node
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

  has(dust: any, options: any = {}): boolean {
    if (ts.SyntaxKind[dust]) return this.hasModifier(dust, options)
    if (ts.NodeFlags[dust]) return this.hasFlag(dust, options)
    return this.error(`has: unknown has (dust) argument, must be a ts modifier or flag`, {
      dust
    }) && false
  }

  hasModifier(modifier: ts.SyntaxKind, options: any = {}): boolean {
    const node: ts.Node = this.nodeOf(options)
    const modifiers = this.modifiersOf(node, options)
    if (!modifiers) return false
    const result = this.findMatch(modifiers, modifier)
    return Boolean(result)
  }

  hasFlag(flag: any, options: any = {}): boolean {
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

