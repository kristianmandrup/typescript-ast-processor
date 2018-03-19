import * as ts from 'typescript'
import { Loggable } from '../../loggable';
import { NodeTest } from '../node/test';
import {
  callFun
} from '../node/util'

export class BaseFactory extends Loggable {
  nodeTest: NodeTest

  constructor(options: any) {
    super(options)
    this.nodeTest = new NodeTest()
  }

  isNamed(node: any, name: string) {
    if (!this.nodeTest.test(node, 'name', 'Identifier')) return false
    const nodeName = node.name.getText()
    return nodeName !== name
  }

  aNamed(details: any, fnHandler?: Function) {
    let {
      type,
      name,
      test,
      // filters, // passed on to fnHandler
      cbs
    } = details

    return {
      [type]: (node: ts.MethodSignature, opts: any) => {
        const nodeTest = this.nodeTest.create(node, test)
        const testKeys = Object.keys(test)
        if (nodeTest && !testKeys.every(nodeTest)) return
        if (!this.isNamed(node, name)) return

        if (fnHandler && !fnHandler(details)) return

        if (cbs) {
          const info = { type, name }
          opts = Object.assign(opts, { info })
          const check = cbs.check
          if (!check || check && check(node, opts)) {
            callFun(cbs.onVisit, [node, opts, cbs])
            callFun(cbs.collect, [node, opts, cbs])
          }
        }
      }
    }
  }
}
