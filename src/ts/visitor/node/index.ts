import * as ts from 'typescript'
import { Loggable } from '../../loggable';
import { What } from './what';
import { NodeTester } from './tester';
import { VisitorFactory } from '../factory';
import { Typer } from './typer';

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
  visitorRegistry: any = {} // object

  constructor(options: any) {
    super(options)
    this.fileName = options.fileName
    this.what = new What(this.nodeTypes)
    this.nodeTester = new NodeTester(options)
    this.typer = new Typer(this.nodeTypes)
    this.factory = new VisitorFactory(options)
    this.visitorIteratorMethodName = options.visitorIteratorMethodName || 'map'
    this.visitorRegistry = options.visitors || {}

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

  registerTypeHandlers(registry: any) {
    Object.assign(this.visitorRegistry, registry)
  }

  get visitorNames() {
    return Object.keys(this.visitorRegistry)
  }

  createVisitorIterator(registry?: any) {
    return this.visitorNames[this.visitorIteratorMethodName]
  }

  /**
   * Test node type and visit registered node type handler
   */
  createVisitorCaller(node: any) {
    return (label: string) => {
      const handlerFun = this.visitorRegistry[label]
      return handlerFun(node, this.state, this.options)
    }
  }

  get types() {
    return {}
  }

  get visitorIterator() {
    return this.createVisitorIterator(this.visitorRegistry)
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
