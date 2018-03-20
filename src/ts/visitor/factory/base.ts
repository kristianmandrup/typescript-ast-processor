import * as ts from 'typescript'
import { Loggable } from '../../loggable';
import { NodeTester } from '../../node/tester';
import {
  callFun
} from '../../util'
import { DataCollector } from '../../collector';

export class BaseFactory extends Loggable {
  nodeTester: NodeTester
  collector: DataCollector

  constructor(options: any) {
    super(options)
    this.nodeTester = new NodeTester(options)
    this.collector = options.collector
  }

  nameMatch(nodeName: string, name: string | RegExp) {
    return name instanceof RegExp ? name.test(nodeName) : name === nodeName
  }

  isNamed(node: any, name: string | RegExp) {
    if (!this.nodeTester.test(node, 'name', 'Identifier')) return false
    const nodeName = node.name.getText()
    return this.nameMatch(nodeName, name)
  }

  generic(details: any, fnHandler?: Function) {
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
      [label]: (node: ts.MethodSignature, state: any = {}, opts: any = {}) => {
        if (name && !this.isNamed(node, name)) return

        // create test
        const nodeTest = this.nodeTester.create(node, test)
        const testKeys = Object.keys(test)
        // perform nodeTest for every key (nodeProp) of propMap
        if (nodeTest && !testKeys.every(nodeTest)) return

        // custom cb
        if (fnHandler && !fnHandler(details, node, state, opts)) return

        if (cbs) {
          const info = { label, name }
          opts = Object.assign(opts, { info })
          const check = cbs.check
          if (!check || check && check(node, opts)) {
            // call custom onVisit callback if
            callFun(cbs.onVisit, node, opts)

            // call collector
            callFun(cbs.collect, node, state)
          }
        }
        if (this.collector) {
          const mathcingCollector = this.collector[label]
          callFun(mathcingCollector, node, state)
        }
      }
    }
  }
}

