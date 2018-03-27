import {
  SrcFile,
  createSrcFile
} from './src-file'

export function createLoader(options: any = {}) {
  return new Loader(options)
}

export class Loader {
  options: any
  srcFile: SrcFile

  constructor(options: any = {}) {
    this.options = options
    this.srcFile = createSrcFile(options)
  }

  load(fileName: string) {
    return this.srcFile.loadSourceFile(fileName)
  }

  process(fileName: string) {
    this.load(fileName).process()
  }
}
