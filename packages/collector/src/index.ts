import { DataCollector } from './base'

export { DataCollector }
import { createCollector } from './base'
import { isEmpty } from '@tecla5/qast-util'

export interface IDataCollector {
  collectData(names?: string[]): any
}

export class RootDataCollector extends DataCollector {
  registry: any = {}
  collectorOpts: any

  /**
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
    this.collectorOpts = Object.assign(options, { parent: this })
  }

  /**
   * Create a new collector
   * @param name
   * @param collectorFn
   */
  createCollector(name: string, collectorFn: Function) {
    return createCollector(name, collectorFn, this.collectorOpts)
  }

  /**
   * Check if named collector is DataCollector instance
   * @param name
   */
  isCollectorInstance(name: string) {
    return this.dataCollector(name) instanceof DataCollector
  }

  /**
   * Check if named collector is registered
   * @param name
   */
  hasCollector(name: string) {
    return Boolean(this.registry[name])
  }

  /**
   * Add map of collectors to registry
   * @param registry
   */
  addCollectors(registry: any) {
    Object.assign(this.registry, registry)
  }

  /**
   * Add one collector to registry
   * @param name
   * @param collectorFn
   */
  addOne(name: string, collectorFn: Function) {
    this.registry[name] = collectorFn
    return this
  }

  /**
   * Add one collector and register all
   * @param name
   * @param collectorFn
   */
  registerOne(name: string, collectorFn: Function) {
    this.addOne(name, collectorFn).registerNamed()
  }

  registerNamed(...names: string[]) {
    names = isEmpty(names) ? this.collectorNames : names
    names.map((name) => {
      if (this.isCollectorInstance(name)) {
        this.registry[name] = this.createCollector(name, this.registry[name])
      }
    })
    return this.registry
  }

  /**
   * Get names of collectors in registry
   */
  get collectorNames() {
    return Object.keys(this.registry)
  }

  /**
   * Get named collector from registry
   * @param name
   */
  dataCollector(name: string) {
    return this.registry[name]
  }

  /**
   * Collect data for named list of collectors (all if no names specified)
   * @param names
   */
  collectData(names = this.collectorNames) {
    names.map((name) => {
      this.dataCollector(name).collectInto(this)
    })
  }
}
