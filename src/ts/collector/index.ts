import {
  DataCollector
} from './base'

export {
  DataCollector
}

export class RootDataCollector extends DataCollector {
  collectorRegistry: any = {}

  constructor(options: any) {
    super(options)
  }

  registerCollectors(registry: any) {
    Object.assign(this.collectorRegistry, registry)
  }

  get collectorNames() {
    return Object.keys(this.collectorRegistry)
  }

  dataCollector(name: string) {
    return this.collectorRegistry[name]
  }

  collectData(names = this.collectorNames) {
    names.map(name => {
      this.dataCollector(name).collectInto(this)
    })
  }
}
