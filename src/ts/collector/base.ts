import * as ts from 'typescript'
import { Loggable } from '../loggable';
import { SrcFile } from '../src-file';
import * as utils from 'tsutils'

export class DataCollector extends Loggable {
  parent: DataCollector
  data: any = {}
  fileName: string
  srcFile: SrcFile
  utils: any

  constructor(options: any) {
    super(options)
    this.srcFile = options.srcFile
    this.fileName = options.srcFile.fileName
    this.utils = utils
    this.parent = options.parent
  }

  collect(node: ts.Node, state: any = {}) {
  }

  // define a way to transfer the data of data collector into aggregator
  collectInto(dataAggregator: any) {

  }
}
