import {
  DataCollector
} from './base'

export {
  DataCollector
}
import {
  createCollector
} from './base'
import {
  isEmpty
} from '../util'

export class RootDataCollector extends DataCollector {
  registry: any = {}
  collectorOpts: any

  constructor(options: any) {
    super(options)
    this.collectorOpts = Object.assign(this.options, { parent: this })
  }

  createCollector(name: string, collectorFn: Function) {
    return createCollector(name, collectorFn, this.collectorOpts)
  }

  isCollectorInstance(name: string) {
    return this.registry[name] instanceof DataCollector
  }

  addCollectors(registry: any) {
    Object.assign(this.registry, registry)
  }

  addOne(name: string, collectorFn: Function) {
    this.registry[name] = collectorFn
    return this
  }

  registerOne(name: string, collectorFn: Function) {
    this.addOne(name, collectorFn).registerNamed()
  }

  registerNamed(...names: string[]) {
    names = isEmpty(names) ? this.collectorNames : names
    names.map(name => {
      if (this.isCollectorInstance(name)) {
        this.registry[name] = this.createCollector(name, this.registry[name])
      }
    })
    return this.registry
  }


  get collectorNames() {
    return Object.keys(this.registry)
  }

  dataCollector(name: string) {
    return this.registry[name]
  }

  collectData(names = this.collectorNames) {
    names.map(name => {
      this.dataCollector(name).collectInto(this)
    })
  }
}
