import { Loggable } from '../../../loggable'
import { isStr } from '../../../util'

/**
 * Factory to create class tester to query and collect data for class node
 * @param node
 * @param options
 */
export function createTesterRegistry(tester: any, options: any = {}) {
  return new TesterRegistry(tester, options)
}

import { factoryMap } from './factory-map'
import { createTesterIdResolver } from './tester-id-resolver'

export class TesterRegistry extends Loggable {
  tester: any
  // maps of testers used by tester
  testers: any = {
    node: {},
    details: {},
  }
  node: any
  testerMap: any
  factoryMap = factoryMap
  factory: any

  constructor(tester: any, options: any = {}) {
    super(options)
    this.tester = tester
    this.factory = tester.factory // ideally avoid this
    this.node = tester.node
    this.init()
  }

  /**
   * Initialize and validate
   * @param tester
   * @param node
   */
  init() {
    if (!this.tester) {
      this.error('Invalid tester', {
        tester: this.tester,
        options: this.options,
      })
    }
    this.testerMap = this.tester.testerMap
    this.configure()
  }

  /**
   * Names of registered testers
   */
  testerNames() {
    return Object.keys(this.testers)
  }

  /**
   * Create node or details tester using category name
   * @param args
   */
  createCategoryTester(
    category: string,
    name: string,
    node?: any,
    options?: any,
  ): any {
    return this.factory.createCategoryTester(category, name, node, options)
  }

  /**
   * Initialize all testers to be used
   */
  configure() {
    // this.setTesters()
  }

  /**
   * Resolve factory name
   * @param factory
   */
  resolveFactoryName(factory: string) {
    return this.factoryMap[factory] || factory
  }

  resolveTypeAndName(value: string): any {
    return createTesterIdResolver(this.options).resolve(value)
  }

  /**
   * Resolve type, name and factory
   * @param name
   * @param factory
   */
  resolveTypeNameAndFactory(value: string, factory?: string) {
    factory = factory || value
    const $name = this.resolveTypeAndName(value)
    const $factory = this.resolveTypeAndName(factory)
    const type = $name.type || $factory.type
    const name = $name.name
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
    type = type || resolved.type
    factory = resolved.factory

    if (!node) {
      this.error('setTester: Missing node', {
        node,
        opts,
      })
    }

    node = node[name] || node
    if (when) {
      when = when.bind(this)
      if (!when(node)) return
    }

    /**
     * Create the tester
     */
    const tester = this.createCategoryTester(type, factory, node, options)
    this.testers[type][name] = tester
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
        type,
        name,
        typeTesters,
        opts,
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
