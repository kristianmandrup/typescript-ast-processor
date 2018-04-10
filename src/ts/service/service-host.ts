import {
  LanguageServiceHost,
  ScriptSnapshot,
  getDefaultLibFilePath,
  sys
} from 'typescript'
import {
  existsSync,
  readFileSync
} from 'fs'

export function createLanguageServiceHost(options: any): LanguageServiceHost {
  const {
    rootFileNames,
    files
  } = options
  return {
    getScriptFileNames: () => rootFileNames,
    getScriptVersion: (fileName) => files[fileName] && files[fileName].version.toString(),
    getScriptSnapshot: (fileName) => {
      if (!existsSync(fileName)) {
        return undefined;
      }

      return ScriptSnapshot.fromString(readFileSync(fileName).toString());
    },
    getCurrentDirectory: () => process.cwd(),
    getCompilationSettings: () => options,
    getDefaultLibFileName: (options) => getDefaultLibFilePath(options),
    fileExists: sys.fileExists,
    readFile: sys.readFile,
    readDirectory: sys.readDirectory,
  }
}
