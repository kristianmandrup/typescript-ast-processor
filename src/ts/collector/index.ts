import {
  DataCollector
} from './base'

export {
  DataCollector
}

import {
  createCollector
} from './base'

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

  register() {
    this.collectorNames.map(name => {
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
