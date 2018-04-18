import { SrcFile, createSrcFile } from './src-file'

export function createLoader(options: any = {}) {
  return new Loader(options)
}

export class Loader {
  options: any
  srcFile: SrcFile

  /**
   * Create a Loader instance
   * @constructor
   * @param options extra options, passed to SrcFile
   */
  constructor(options: any = {}) {
    this.options = options
    this.srcFile = createSrcFile(options)
  }

  /**
   * Load a single typescript source file
   * @param filePath file path to the file to load
   */
  load(filePath: string) {
    return this.srcFile.loadSourceFile(filePath)
  }

  /**
   * Load a source file and process it directly
   * @param filePath
   */
  process(filePath: string) {
    this.load(filePath).process()
  }
}
