import * as ts from 'typescript'
import { Loggable } from '../../loggable';
import * as types from './types'
import {
  CheckModifier,
  CheckFlag
} from './details';
import { What } from './what';
import { NodeTest } from './test';

export interface IExtraOptions {
  arrow?: boolean;
  parens?: [number, number];
}

export class NodeVisitor extends Loggable {
  fileName: string
  nodeTypes: any = {
    all: []
  }
  state: {}
  modifer: CheckModifier
  flag: CheckFlag
  what: What
  nodeTest: NodeTest

  static nodeTypes = {
    all: Object.keys(ts).filter(key => /^is[A-Z]/.test(key)).map(key => key.substr(2))
  }

  constructor(options: any) {
    super(options)
    this.fileName = options.fileName
    this.nodeTypes.all = NodeVisitor.nodeTypes.all
    this.nodeTypes.used = options.nodeTypes || this.nodeTypes.all
    this.modifer = new CheckModifier()
    this.flag = new CheckFlag()
    this.what = new What(this.nodeTypes)
    this.nodeTest = new NodeTest()
  }

  visit(node: ts.Node) {
    this.log('visit', { kind: String(node.kind) })
    this.nodeTypes.used.find((type: string) => {
      // TODO: use nodeTest??
      const testFunName = `is${type}`
      const testFun = this[testFunName]
      if (testFun(node)) {
        const handlerFun = this[type]
        return handlerFun(node, this.state, this.options)
      }
    })
    this.recurseChildNodes(node)
  }

  recurseChildNodes(node: ts.Node) {
    node.forEachChild((child: ts.Node) => this.visit(child))
  }
}
