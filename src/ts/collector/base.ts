import * as ts from 'typescript'
import { Loggable } from '../loggable';
import { SrcFile } from '../src-file';
import * as utils from 'tsutils'

export function createCollector(name: string, collectorFn: Function, options: any) {
  const collector = createDataCollector(options)
  collector.collect = collectorFn.bind(collector)
  collector.name = name
  return collector
}

export function createDataCollector(options: any) {
  return new DataCollector(options)
}


export class DataCollector extends Loggable {
  parent: DataCollector
  data: any = {}
  fileName: string
  srcFile: SrcFile
  utils: any
  name: string

  constructor(options: any = {}) {
    super(options)
    this.srcFile = options.srcFile
    this.fileName = options.srcFile.fileName
    this.utils = utils
    this.parent = options.parent // ref to higher level data aggregator
    this.name = options.name || 'unnamed'
  }

  collect(node: ts.Node, state: any = {}) {
  }

  // define a way to transfer the data of data collector into aggregator
  collectInto(dataAggregator: any) {
    return Object.assign(dataAggregator.data, this.data)
  }
}
