import * as ts from 'typescript'
import { Loggable } from '../../loggable';
import { What } from '../../node/what';
import { VisitorFactory } from '../../visitor/factory';
import { Typer } from '../../node/typer';
import {
  assignKeyDefined,
  enumKey
} from '../../util'
import {
  isFunction,
  isNonEmptyStr,
} from '../../../../src/ts/util';
import { isRegExp } from 'util';

export function createASTNodeTraverser(options: any) {
  return new ASTNodeTraverser(options)
}

enum TraverseMode {
  Children,
  Ancestor
}
export interface IExtraOptions {
  arrow?: boolean;
  parens?: [number, number];
}

export class ASTNodeTraverser extends Loggable {
  fileName: string
  state: {}
  what: What
  visitorIteratorMethodName: string

  typer: Typer
  factory: VisitorFactory
  registry: any = {} // object
  nestingLevel: number

  startNode: any
  visitedNodes: any[]
  visitedNodesMap: any = {}
  _lastVisitedNode: any
  query: any
  mode: TraverseMode | undefined

  /**
   * Create an AST Node Traverser
   * @param options
   */
  constructor(options: any) {
    super(options)
    this.init(options)
  }

  setMode(modeLabel: string): any {
    this.mode = this.resolveMode(modeLabel)
  }

  protected resolveMode(modeLabel: string): TraverseMode | undefined {
    if (/child/.test(modeLabel)) return TraverseMode.Children
    if (/parent/.test(modeLabel) || /ancestor/.test(modeLabel)) return TraverseMode.Ancestor
    this.error('Traverse mode could not be resolved', {
      mode: modeLabel
    })
    return undefined
  }

  reset() {
    this.nestingLevel = 0
    this._lastVisitedNode = undefined
    this.visitedNodes = []
    this.visitedNodesMap = {}
    this.mode = TraverseMode.Children
    this.state = {}
  }

  /**
   * Initialize with options object
   * Customize to suit your needs ;)
   * @param options
   */
  init(options: any = {}) {
    this.reset()
    this.mode = options.mode || this.mode
    this.query = options.query
    this.startNode = options.node
    this.fileName = options.fileName
    this.typer = new Typer()
    this.what = new What(this.nodeTypes)
    this.factory = new VisitorFactory(options)
    this.visitorIteratorMethodName = options.visitorIteratorMethodName || 'map'
    this.registry = options.visitors || {}
    const createVisitorIterator = options.createVisitorIterator || this._createVisitorIterator
    this._createVisitorIterator = createVisitorIterator.bind(this)
  }

  /**
   * Test if a match expression matches type of node
   * @param node
   * @param nodeTypeMatcher
   */
  matchesType(node: any, nodeTypeMatcher: any) {
    const { nodeType } = node
    if (isNonEmptyStr(nodeTypeMatcher)) {
      return nodeType === nodeTypeMatcher
    }
    if (isRegExp(nodeTypeMatcher)) {
      return nodeTypeMatcher.test(nodeType)
    }
    return false
  }

  /**
   * Find first node matching a given nodeType
   * @param nodeType
   */
  findFirst(nodeTypeMatcher: any) {
    let foundNode
    this.onVisited = (node: any) => {
      if (this.matchesType(node, nodeTypeMatcher)) {
        foundNode = node
        this.shouldVisitNode = () => false
      }
    }
    this.visit()
    return foundNode
  }


  /**
   * query:
   * query:
   *  - typesToCount
   *  - typeChecker
   *  - excludeVisit
   *
   * @param query
   */
  parseQuery(query: any = {}) {
    return this
  }


  /**
   * Determine kind of node based on categorical tests
   * Note: see Typer and What classes
   */
  protected get _whatIs() {
    return this.what.is
  }

  /**
   * The node types available for the typer
   */
  get nodeTypes() {
    return this.typer.nodeTypes
  }

  /**
   * Get the types of a . (dot) path such as module.external or loop.flow (see Typer)
   * @param dotPath types category path
   */
  protected _typesOfPath(dotPath: string) {
    return this.typer.typesOfPath(dotPath)
  }

  /**
   * Register a full registry (map) of visitors, adding it to current registry
   * @param registry
   */
  registerVisitors(registry: any): any {
    const keys = Object.keys(registry)
    keys.map((key: string) => {
      this.registerVisitor(key, registry[key])
    })
    return this.registry
  }

  /**
   * Register a single named visitor function
   * @param name
   * @param visitor
   */
  registerVisitor(name: string, visitor: Function): any {
    if (!isNonEmptyStr(name) || !isFunction(visitor)) {
      this.onInvalidVisitorRegistration(name, visitor)
    }
    this.registry[name] = visitor
    return this.registry
  }

  protected onInvalidVisitorRegistration(name: any, visitor: any): any {
    this.error('Invalid visitor registration', {
      name,
      visitor
    })
  }

  /**
   * The labels of the registered visitors
   */
  protected get _visitorNames() {
    return Object.keys(this.registry)
  }

  /**
   * Create a visitor iterator to iterate the registered iterators in the registry
   * @param registry
   */
  protected _createVisitorIterator(registry?: any) {
    return this._visitorNames[this.visitorIteratorMethodName]
  }

  /**
   * Test node type and visit registered node type handler
   */
  protected _createVisitorCaller(node: any) {
    return (label: string) => {
      const handlerFun = this.registry[label]
      return handlerFun(node, this.state, this.options)
    }
  }

  /**
   * The visitor iterator to use
   */
  get visitorIterator() {
    return this._createVisitorIterator(this.registry)
  }

  /**
   * Used to log nodes visited
   * Override and refine to provide a more meaningful feedback
   * perhaps using query engine data collection?
   * @param node the ndoe to display info for
   */
  nodeDisplayInfo(node: any) {
    return {
      kind: this.kindOf(node)
    }
  }

  /**
   * Determine kind of node
   * @param node
   */
  protected kindOf(node: any): string {
    if (!node) {
      this.error('kindOf: Invalid node', {
        node
      })
    }
    return enumKey(ts.SyntaxKind, node.kind) || 'unknown'
  }

  /**
   * Get the type of a node
   * @param node
   */
  protected typeOf(node: any): string {
    return this.kindOf(node)
  }

  /**
   * Handler for when node visiting was skipped
   * @param node
   */
  protected skipped(node: any) {
    this.log('skipped', this.nodeDisplayInfo(node))
    return this
  }

  /**
   * Translate type name if necessary
   * Esp. useful when traverser used with "foreign" ASTs
   * @param typeName
   * @param fnName
   */
  protected typeNameFor(typeName: string, fnName?: string) {
    return fnName || typeName
  }

  /**
   *
   * @param node
   */
  protected onVisited(node: any) {

  }

  protected visitedNodesListFor(nodeType: string) {
    return this.visitedNodesMap[nodeType] || []
  }

  protected visitNodeType(nodeType: string, node: any) {
    if (!nodeType) return
    const list = this.visitedNodesListFor(nodeType)
    if (Array.isArray(list)) {
      // this.log('visitNodeType', {
      //   nodeType,
      //   node,
      //   list
      // })
      list.push(node)
      this.visitedNodesMap[nodeType] = list
    }
    return this
  }

  /**
   * Handler for just after node was visited
   * @param node
   */
  protected wasVisited(node: any) {
    if (node) {
      const { nodeType } = node

      this.log('visited', this.nodeDisplayInfo(node))
      this._lastVisitedNode = node

      this.visitedNodes.push(node)
      // add to map of node types encountered
      this.visitNodeType(nodeType, node)
      this.onVisited(node)
    } else {
      this.log('mysterious node!!', {
        node
      })
    }
    return this
  }

  /**
   * Handler for just before node is visited
   * @param node
   */
  protected willVisit(node: any) {
  }

  /**
   * Check if node was visited before
   * @param node
   */
  protected wasVisitedBefore(node: any) {
    return this.visitedNodes.includes(node)
  }

  /**
   *
   */
  get visitedNodesCount(): number {
    return this.visitedNodes.length
  }

  /**
   *
   */
  get lastVisitedNode() {
    return this._lastVisitedNode || this.visitedNodes[this.visitedNodesCount - 1]
  }

  /**
   * Visit an AST node by passing it to each of the registered visitors
   * @param node
   */
  visit(nextNode?: ts.Node) {
    const node = nextNode || this.startNode
    // assignKeyDefined(node, 'nodeType', this.typeOf(node))
    const type = this.typeOf(node)
    node.nodeType = type
    if (!this.shouldVisitNode(node)) {
      this.skipped(node)
      return
    }
    this.willVisit(node)
    this.visitorIterator(this._createVisitorCaller(node))
    this.wasVisited(node)
    this.traverseNext(node)
  }

  /**
   * Determine if traverser should traverse child nodes for this node
   * @param node
   */
  protected shouldTraverseChildNodes(node: ts.Node) {
    return true
  }

  /**
   * Determine if traverser should traverse ancestor node for this node
   * @param node
   */
  protected shouldTraverseAncestor(node: ts.Node) {
    return true
  }

  /**
   * Determine if node should be excluded from visit
   * @param node
   */
  protected shouldExcludeNodeFromVisit(node: any) {
    return false
  }

  /**
   * Determine if traverser should visit this node
   * @param node
   */
  protected shouldVisitNode(node: any) {
    return !this.wasVisitedBefore(node)
  }

  protected get traverseNextMethod() {
    return this.mode === TraverseMode.Children ? 'traverseChildNodes' : 'traverseAncestor'
  }

  /**
   * Traverse next node(s)
   * Usually either ancestry (up/root) or child nodes (down/sub trees)
   * @param node
   */
  protected traverseNext(node: any) {
    this[this.traverseNextMethod](node)
  }

  /**
   * Traverse child nodes
   * @param node
   */
  protected traverseChildNodes(node: ts.Node) {
    if (!this.shouldTraverseChildNodes(node)) return
    node.forEachChild((child: ts.Node) => this.visit(child))
  }

  /**
   * Traverse ancestry nodes via parent reference
   * @param node
   */
  protected traverseAncestor(node: ts.Node) {
    if (!this.shouldTraverseAncestor(node)) return
    if (node.parent) {
      this.visit(node.parent)
    }
  }
}
