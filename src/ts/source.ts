import * as fs from 'fs-extra'
import {
  Loggable
} from './loggable'

export class Source extends Loggable {
  fs: any

  constructor(options: any) {
    super(options)
    this.fs = options.fs || fs
  }
}
