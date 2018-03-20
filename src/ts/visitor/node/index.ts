import * as ts from 'typescript'
import { Loggable } from '../../loggable';
import { What } from '../../node/what';
import { NodeTester } from '../../node/tester';
import { VisitorFactory } from '../factory';
import { Typer } from '../../node/typer';

export function createNodeVisitor(options: any) {
  return new NodeVisitor(options)
}

export interface IExtraOptions {
  arrow?: boolean;
  parens?: [number, number];
}

export class NodeVisitor extends Loggable {
  fileName: string
  state: {}
  what: What
  nodeTester: NodeTester
  visitorIteratorMethodName: string

  typer: Typer
  factory: VisitorFactory
  registry: any = {} // object

  constructor(options: any) {
    super(options)
    this.fileName = options.fileName
    this.what = new What(this.nodeTypes)
    this.nodeTester = new NodeTester(options)
    this.typer = new Typer(this.nodeTypes)
    this.factory = new VisitorFactory(options)
    this.visitorIteratorMethodName = options.visitorIteratorMethodName || 'map'
    this.registry = options.visitors || {}

    const createVisitorIterator = options.createVisitorIterator || this.createVisitorIterator
    this.createVisitorIterator = createVisitorIterator.bind(this)
  }

  get whatIs() {
    return this.what.is
  }

  get nodeTypes() {
    return this.typer.nodeTypes
  }

  typesOfPath(dotPath: string) {
    return this.typer.typesOfPath(dotPath)
  }

  registerVisitors(registry: any) {
    Object.assign(this.registry, registry)
  }

  registerVisitor(name: string, visitor: Function) {
    this.registry[name] = visitor
  }


  get visitorNames() {
    return Object.keys(this.registry)
  }

  createVisitorIterator(registry?: any) {
    return this.visitorNames[this.visitorIteratorMethodName]
  }

  /**
   * Test node type and visit registered node type handler
   */
  createVisitorCaller(node: any) {
    return (label: string) => {
      const handlerFun = this.registry[label]
      return handlerFun(node, this.state, this.options)
    }
  }

  get types() {
    return {}
  }

  get visitorIterator() {
    return this.createVisitorIterator(this.registry)
  }

  nodeDisplayInfo(node: any) {
    return { kind: String(node.kind) }
  }

  visit(node: ts.Node) {
    this.log('visit', this.nodeDisplayInfo(node))
    // allow creation of custom iterator
    this.visitorIterator(this.createVisitorCaller(node))
    this.recurseChildNodes(node)
  }

  recurseChildNodes(node: ts.Node) {
    node.forEachChild((child: ts.Node) => this.visit(child))
  }
}
