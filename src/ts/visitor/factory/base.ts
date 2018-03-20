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

  named(details: any, fnHandler?: Function) {
    let {
      label,
      types,
      name,
      options,
    } = details

    const {
      test, // object containing defs of tests (guards) to perform
      cbs
    } = options

    label = label || types.join('_')
    if (!label) {
      this.error('named: Missing label for factory method', details)
    }

    return {
      [label]: (node: ts.MethodSignature, opts: any) => {
        if (!this.isNamed(node, name)) return

        // create test
        const nodeTest = this.nodeTest.create(node, test)
        const testKeys = Object.keys(test)
        // perform nodeTest for every key (nodeProp) of propMap
        if (nodeTest && !testKeys.every(nodeTest)) return

        // custom test cb
        if (fnHandler && !fnHandler(details)) return

        if (cbs) {
          const info = { label, name }
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
