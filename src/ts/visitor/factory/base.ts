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
    const { type, name, test, filters, cbs } = details
    return {
      [type]: (node: ts.MethodSignature, opts: any) => {
        const nodeTest = this.nodeTest.create(node, test)
        const testKeys = Object.keys(test)
        if (!testKeys.every(nodeTest)) return

        if (this.nodeTest.test(node, 'name', 'Identifier')) {
          const nodeName = node.name.getText()
          if (nodeName !== name) return

          if (fnHandler && !fnHandler({ name, filters, node, cbs })) return

          if (cbs) {
            const info = { type, name: nodeName }
            opts = Object.assign(opts, { info })
            const check = cbs.check
            if (!check || check && check(node, opts)) {
              callFun(() => cbs.onVisit(node, opts, cbs))
              callFun(() => cbs.collect(node, opts, cbs))
            }
          }
        }
      }
    }
  }
}
