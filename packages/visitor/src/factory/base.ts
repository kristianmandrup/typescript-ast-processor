import * as ts from 'typescript'
import { Loggable } from '@tecla5/qast-loggable'
import { callFun } from '@tecla5/qast-util'

export interface IDataCollector {}

export class BaseFactory extends Loggable {
  collector: IDataCollector

  /**
   * Create base visitor factory
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
    this.collector = options.collector
  }

  /**
   * Perform a name match
   * @param nodeName
   * @param name
   */
  nameMatch(nodeName: string, name: string | RegExp) {
    return name instanceof RegExp ? name.test(nodeName) : name === nodeName
  }

  /**
   * Check if node matches name
   * @param node
   * @param name
   */
  isNamed(node: any, name: string | RegExp) {
    if (!node.name) return false
    const nodeName = node.name.getText()
    return this.nameMatch(nodeName, name)
  }

  /**
   * Create generic visitor function map
   * @param details
   * @param fnHandler
   */
  generic(details: any, fnHandler?: Function) {
    let { label, types, name, options } = details

    const { cbs } = options

    label = label || types.join('_')
    if (!label) {
      this.error('named: Missing label for factory method', details)
    }

    return {
      [label]: (node: ts.MethodSignature, state: any = {}, opts: any = {}) => {
        if (name && !this.isNamed(node, name)) return

        // custom cb
        if (fnHandler && !fnHandler(details, node, state, opts)) return

        if (cbs) {
          const info = { label, name }
          opts = Object.assign(opts, { info })
          const check = cbs.check
          if (!check || (check && check(node, opts))) {
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
      },
    }
  }
}
