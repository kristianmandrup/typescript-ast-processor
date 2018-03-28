import * as fs from 'fs-extra'
import {
  Loggable
} from './loggable'

export class Source extends Loggable {
  fs: any

  /**
   * Generic source base class
   * Can f.ex take fs as an option to use a
   * virtual file system (VFS) of some kind, such as in-memory
   * @param options
   */
  constructor(options: any) {
    super(options)
    this.fs = options.fs || fs
  }
}
