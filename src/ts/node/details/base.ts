import * as ts from 'typescript'
import { Loggable } from '../../loggable'
import { callFun, toList, isStr, isFunction, lowercaseFirst } from '../../util'
import { queryNode } from '../tester/util/query'

export interface IDetailsTester {
  forNode(node: any): IDetailsTester
  matches(options?: any): any
  is(name: string, options?: any): boolean
  test(query: any, options?: any): any // boolean ??
}

export class BaseDetailsTester extends Loggable {
  modifierKey: string = 'modifiers'
  node: any
  syntaxMap: any
  flagMap: any
  funMap: any
  maps: any

  /**
   * Create base details tester
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
    this.modifierKey = options.modifierKey || this.modifierKey
    this.node = options.node
    this.funMap = this.checkerNames.reduce((acc: any, key: string) => {
      const fun = this[key]
      if (isFunction(fun)) {
        acc[key] = fun.bind(this)
      }
      return acc
    }, {})

    this.maps = Object.assign({}, this.syntaxMap, this.flagMap)
  }

  /**
   * instance category
   */
  get category() {
    return 'NodeDetailsTester'
  }

  /**
   * By default get by using keys of all maps used
   * Override to add custom checker names (See loop.ts for example)
   */
  get checkerNames() {
    return Object.keys(this.maps || {})
  }

  /**
   * Get a map of checker functions to be used
   */
  get checkers() {
    return this.funMap
  }

  /**
   * Convenient chain helper to assign node to test on (by default)
   * @param node
   */
  forNode(node: any) {
    this.node = node
    return this
  }

  /**
   * Signal error
   * @param msg error message
   * @param data error context
   */
  // protected
  error(msg: string, data: any): boolean {
    super.error(msg, data)
    return false
  }

  /**
   * Normalize checker name to check on
   * @param name
   */
  protected _checkerName(name: string) {
    return lowercaseFirst(name)
  }

  /**
   * Test all names using anyOf query by default
   * @param names names to test
   * @param options pass optional node and query method to use
   */
  testNames(names: any, options: any = {}) {
    const node: ts.Node = this.nodeOf(options)
    const method = options.method || 'anyOf'
    return this.test(node, {
      [method]: names,
    })
  }

  /**
   * Get the modifier or modifiers child node(s) to test on
   * @param node
   * @param options
   */
  modifiersOf(node: any, options: any = {}) {
    const modifierKey = options.modifierKey || this.modifierKey
    if (!modifierKey) {
      this.error('modifiersOf: Missing modifierKey', {
        modifierKey,
        this: this.modifierKey,
        options,
      })
    }
    return node[modifierKey] || []
  }

  /**
   * Get the node to test on, either from options or from class instance var
   * @param options
   */
  nodeOf(options: any = {}) {
    return options.node || this.node
  }

  /**
   * Find first modifier on modifer list that matches modifier
   * @param modifiers
   * @param modifier
   */
  findMatch(modifiers: any, key: ts.SyntaxKind | string) {
    modifiers = toList(modifiers)
    const modifier: ts.SyntaxKind = this.resolveModifier(key)
    return modifiers.find(
      (nodeModifier: any) => (nodeModifier.kind || nodeModifier) === modifier,
    )
  }

  /**
   * Resolve modifier to enum either from key, either from maps via string key or key itself (enum)
   * @param key { ts.SyntaxKind | string } key to resolve
   */
  resolveModifier(key: ts.SyntaxKind | string) {
    return isStr(key) ? this.maps[key] : key
  }

  /**
   * Determine if key is a modifier key
   * @param key { any } used to test if a modifier key
   */
  isModifier(key: any) {
    return isStr(key) ? (this.syntaxMap || {})[key] : ts.SyntaxKind[key]
  }

  /**
   * Determine if key is a modifier key
   * @param key { ts.SyntaxKind | string } used to test if a modifier key
   */
  isFlag(key: any) {
    return isStr(key) ? (this.flagMap || {})[key] : ts.NodeFlags[key]
  }

  /**
   * Check if node has the particular modifier or flag
   * @param key used to test modifier or flag
   * @param options xtras including override node
   */
  has(key: any, options: any = {}): boolean {
    const modf = this.isModifier(key)
    const flag = this.isFlag(key)
    if (modf) return this.hasModifier(key, options)
    if (flag) return this.hasFlag(key, options)
    return (
      this.error(
        `has: unknown has key argument, must be a ts modifier or flag`,
        {
          key,
        },
      ) && false
    )
  }

  /**
   * Check if node has the particular modifier
   * @param key used to test modifier
   * @param options xtras including override node
   */
  hasModifier(key: ts.SyntaxKind | string, options: any = {}): boolean {
    const modifier: ts.SyntaxKind = isStr(key) ? this.syntaxMap[key] : key
    const node: ts.Node = this.nodeOf(options)
    if (!node) {
      this.error('hasModifier: Missing node', {
        node,
      })
    }
    const modifiers = this.modifiersOf(node, options)
    if (!modifiers) return false
    const result = this.findMatch(modifiers, modifier)
    return Boolean(result)
  }

  /**
   * Check if node has the particular flag
   * @param key used to test flag
   * @param options xtras including override node
   */
  hasFlag(key: any, options: any = {}): boolean {
    const flag: ts.NodeFlags = isStr(key) ? this.flagMap[key] : key
    const node = this.nodeOf(options)
    if (!node.flags) return false
    // to test if a const: https://github.com/Microsoft/TypeScript/issues/22681#issuecomment-374002621
    // variableDeclarationList.flags & ts.NodeFlags.Const
    return Boolean(node.flags & flag)
  }

  /**
   * query node for modifier/flag containment
   * @param query
   * @param options
   */
  test(query: any, options: any = {}): any {
    const node: ts.Node = this.nodeOf(options)
    const queryOpts = Object.assign(options, { tester: this.is.bind(this) })
    return queryNode(node, query, queryOpts)
  }

  /**
   * Return name when match found, false when no match
   * Useful when you want to know what matched, not only if matched or not!
   * named('arrow', functionNode) - 'arrow'/false
   * @param name
   * @param options
   */
  named(name: string, options: any = {}) {
    this.is(name, options) ? name : false
  }

  /**
   * Find the name or names of checker functions that match
   * Uses find by default, but can be overridden
   * - method option to override .find with .every or similar Array iterator
   * - test option with method to use to test name on each iteration
   * @param options pass
   */
  matches(options: any = {}): any {
    const filterMethod: string = options.method || 'find'
    const defaultFind = (name: string) => {
      return this.is(name, options)
    }
    const findFn = options.test || defaultFind
    return this.checkerNames[filterMethod](findFn)
  }

  matchesAny(names: string[], options: any = {}) {
    return names.find((name: string) => {
      return this.is(name, options)
    })
  }

  /**
   * Call the matching checker to test if this aspect of the node is true
   * is('arrow', functionNode) - true/false
   * @param name
   * @param options
   */
  is(name: string, options: any = {}): boolean {
    const node: ts.Node = this.nodeOf(options)
    // normalize name by lowercasing first letter
    name = this._checkerName(name)
    const fun = this.checkers[name]
    return callFun(fun, node)
  }
}
