import {
  createSrcFile
} from '../'

export function createSetup(fileName: string) {
  return function (): any {
    const srcFile = createSrcFile().loadSourceFile(fileName)
    return {
      srcFile,
      sourceFile: srcFile.sourceFile
    }
  }
}


