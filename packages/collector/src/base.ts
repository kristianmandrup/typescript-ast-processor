import * as ts from 'typescript'
import { Loggable } from '@tecla5/qast-loggable'
import { SrcFile } from '@tecla5/qast-core'
import * as utils from 'tsutils'
import { INodeTester } from '@tecla5/qast-node-matcher'

export function createCollector(
  name: string,
  collectorFn: Function,
  options: any,
) {
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
  tester: INodeTester

  /**
   * @constructor
   * @param options { object }
   */
  constructor(options: any = {}) {
    super(options)
    this.srcFile = options.srcFile
    this.fileName = options.srcFile.fileName
    this.utils = utils
    this.parent = options.parent // ref to higher level data aggregator
    this.name = options.name || 'unnamed'
  }

  /**
   * Collect node data
   * @param node
   * @param state
   */
  collect(node: ts.Node, state: any = {}) {}

  /**
   * Define a way to transfer the data of data collector into aggregator
   * @param dataAggregator
   */
  collectInto(dataAggregator: any) {
    return Object.assign(dataAggregator.data, this.data)
  }
}
