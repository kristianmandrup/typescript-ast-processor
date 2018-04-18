import { Loggable } from '../../../loggable'
import { isStr } from '../../../util'

/**
 * Factory to create class tester to query and collect data for class node
 * @param node
 * @param options
 */
export function createTesterRegistry(node: any, options: any = {}) {
  return new TesterRegistry(node, options)
}

import { factoryMap } from './factory-map'

export class TesterRegistry extends Loggable {
  tester: any
  // maps of testers used by tester
  testers: any = {
    node: {},
    details: {},
  }
  node: any
  createCategoryTester: Function
  testerMap: any
  factoryMap = factoryMap

  constructor(tester: any, node: any, options: any = {}) {
    super(options)
    this.tester = tester
    this.createCategoryTester = tester.createCategoryTester.bind(tester)
    this.testerMap = tester.testerMap
  }

  /**
   * Initialize all testers to be used
   */
  init() {
    this.setTesters()
  }

  /**
   * Resolve factory name
   * @param factory
   */
  resolveFactoryName(factory: string) {
    return this.factoryMap[factory] || factory
  }

  /**
   * Resolve type and name
   * @param name
   */
  resolveTypeAndName(name: string): any {
    const names = name.split(':')
    let facPrefix = names[0]
    if (['node', 'details'].includes(facPrefix)) {
      name = names[1]
      return {
        type: facPrefix,
        name,
      }
    }
    return {
      name: names[1] || name,
    }
  }

  /**
   * Resolve type, name and factory
   * @param name
   * @param factory
   */
  resolveTypeNameAndFactory(name: string, factory?: string) {
    factory = factory || name
    const $name = this.resolveTypeAndName(name)
    const $factory = this.resolveTypeAndName(factory)
    const type = $name.type || $factory.type
    name = $name.name
    factory = this.resolveFactoryName($factory.name)
    return {
      name,
      type,
      factory,
    }
  }

  /**
   * Set a tester (helper) on the node tester
   * @param opts
   */
  setTester(opts: any = {}) {
    let { type = 'node', name, factory, when, node, options } = opts
    node = node || this.node
    options = options || this.options
    factory = factory || name
    name = name || factory
    const resolved = this.resolveTypeNameAndFactory(name, factory)
    name = resolved.name
    type = resolved.type || type
    factory = resolved.factory

    node = node[name] || node
    if (when) {
      when = when.bind(this)
      if (!when(node)) return
    }

    const tester = this.createCategoryTester(type, factory, node, options)
    this.testers[type][factory] = tester
    return this
  }

  /**
   * Set all testers using testerMap
   */
  setTesters() {
    Object.keys(this.testerMap).map((key: string) => {
      const val = this.testerMap[key]
      const data = isStr(val) ? { factory: val } : val
      this.setTester({
        name: key,
        ...data,
      })
    })
  }

  /**
   * Get a registered tester
   * @param opts
   */
  getTester(opts: any = {}) {
    opts = isStr(opts)
      ? {
          name: opts,
        }
      : opts

    let { name, type = 'node' } = opts
    const names = name.split(':')

    let typePrefix = names[0]
    if (['node', 'details'].includes(typePrefix)) {
      type = typePrefix
      name = names[1]
    }

    const typeTesters = this.testers[type]
    if (!typeTesters) {
      this.error('getTester: invalid type', {
        type,
        testers: this.testers,
      })
    }
    const namedTester = typeTesters[name]
    if (!namedTester) {
      this.log('getTester: invalid name', {
        name,
        testers: typeTesters,
      })
    }

    return namedTester
  }

  /**
   * Check if tester is available
   * @param opts
   */
  hasTester(opts: any = {}) {
    return Boolean(this.getTester(opts))
  }

  /**
   * Get a property of a tester
   * @param opts { string | object }
   */
  getProp(opts: any = {}) {
    if (isStr(opts)) {
      opts = {
        name: opts, // use as name
      }
    }

    const property = opts.property || opts.prop || 'info'
    const fun = opts.fun
    const args = opts.args || []
    const is = opts.is
    const tester = this.getTester(opts)
    if (!tester) return
    let res
    if (is) {
      res = tester.is(is)
    }
    if (fun) {
      res = tester[fun](...args)
    }
    if (property) {
      const fun = tester[property]
      res = fun
      if (typeof res === 'function') {
        res = tester[property]()
      }
    }
    return res || opts.default
  }
}
