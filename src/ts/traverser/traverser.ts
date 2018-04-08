import * as ts from 'typescript'
import { Loggable } from '../loggable';
import { What } from '../node/what';
import { VisitorFactory } from '../visitor/factory';
import { Typer } from '../node/typer';
import {
  assignKeyDefined
} from '../util'

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
  nestingLevel: number = 0

  startNode: any
  visitedNodes: any[]
  query: any
  mode: TraverseMode.Children

  /**
   * Create an AST Node Traverser
   * @param options
   */
  constructor(options: any) {
    super(options)
    this.init(options)
  }

  /**
   * Initialize with options object
   * Customize to suit your needs ;)
   * @param options
   */
  init(options: any = {}) {
    this.mode = options.mode || this.mode
    this.query = options.query
    this.parseQuery(options.query)
    this.startNode = options.node
    this.fileName = options.fileName
    this.what = new What(this._nodeTypes)
    this.typer = new Typer(this._nodeTypes)
    this.factory = new VisitorFactory(options)
    this.visitorIteratorMethodName = options.visitorIteratorMethodName || 'map'
    this.registry = options.visitors || {}
    const createVisitorIterator = options.createVisitorIterator || this._createVisitorIterator
    this._createVisitorIterator = createVisitorIterator.bind(this)
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
  protected get _nodeTypes() {
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
  registerVisitors(registry: any) {
    Object.assign(this.registry, registry)
  }

  /**
   * Register a single named visitor function
   * @param name
   * @param visitor
   */
  registerVisitor(name: string, visitor: Function) {
    this.registry[name] = visitor
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
    return { kind: String(node.kind) }
  }

  /**
   * Get the type of a node
   * @param node
   */
  protected typeOf(node: any): string | undefined {
    return node.kind || 'unknown'
  }

  /**
   * Handler for when node visiting was skipped
   * @param node
   */
  protected skipped(node: any) {
    this.log('skipped', this.nodeDisplayInfo(node))
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
   * Handler for just after node was visited
   * @param node
   */
  protected wasVisited(node: any) {
    this.log('visited', this.nodeDisplayInfo(node))
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
   * Visit an AST node by passing it to each of the registered visitors
   * @param node
   */
  visit(nextNode?: ts.Node) {
    const node = nextNode || this.startNode
    assignKeyDefined(node, 'nodeType', this.typeOf(node))
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
    true
  }

  /**
   * Determine if traverser should traverse ancestor node for this node
   * @param node
   */
  protected shouldTraverseAncestor(node: ts.Node) {
    true
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
