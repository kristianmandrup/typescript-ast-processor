import {
  Source
} from './source'
import * as ts from 'typescript'
import {
  Processor
} from './processor'
import {
  compilerOpts
} from './opts/compiler'

export interface ISourceFileOpts {
  filePath: string
  sourceText?: string
}

const defaults = {
  compilerOpts
}

export function createSrcFile(options: any = {}) {
  return new SrcFile(options)
}

export class SrcFile extends Source {
  compilerOpts: ts.CompilerOptions
  languageVersion: ts.ScriptTarget
  filePaths: string[] = []
  tsfilePaths: string[] = []
  filePath: string
  sourceFile: ts.SourceFile
  sourceText: string
  _processor: Processor

  /**
   * Create a SrcFile instance with compiler options and language version to use
   * @param options
   */
  constructor(options: any = {}) {
    super(options)
    this.compilerOpts = options.compiler || defaults.compilerOpts
    this.languageVersion = this.scriptTargetFor(options.languageVersion)
  }

  /**
   * Resolve the script target such as latest or ES2017 etc.
   * TODO: currently hardcoded to latest
   * @param languageVersion
   */
  scriptTargetFor(languageVersion: string) {
    return ts.ScriptTarget.Latest
  }

  /**
   * Check if this is a TypeScript file based on extension
   * @param filePath
   */
  isTsFile(filePath: string): boolean {
    return filePath.endsWith('.ts') || filePath.endsWith('.tsx')
  }


  /**
   * Validate that we have any source files
   */
  validateSrcFiles(): any {
    return this.tsfilePaths.length > 0 || this.error('No TypeScript files found', {
      filePaths: this.filePaths
    })
  }

  /**
   * Load a source file
   * @param filePath
   */
  loadSourceFile(filePath: string): SrcFile {
    if (!this.isTsFile(filePath)) {
      this.error('Not a valid TypeScript file extension', {
        filePath
      })
    }
    this.filePath = filePath
    this.createSourceFile({ filePath })
    return this
  }

  /**
   *
   * @param options
   */
  createSourceFile(options: ISourceFileOpts): ts.SourceFile {
    this.sourceText = this.sourceTextFor(options)
    this.sourceFile = ts.createSourceFile(options.filePath, this.sourceText, this.languageVersion, true)
    return this.sourceFile
  }

  readSourceText(filePath: string) {
    return this.fs.readFileSync(filePath).toString()
  }

  sourceTextFor(options: ISourceFileOpts) {
    const {
      filePath,
      sourceText
    } = options
    return sourceText ? sourceText : this.readSourceText(filePath)
  }

  get processor() {
    this._processor = this._processor || new Processor(this)
    return this._processor
  }

  process(sourceFile?: ts.SourceFile) {
    sourceFile = sourceFile || this.sourceFile
    return sourceFile ? this.processor.process(sourceFile) : this.error('missing source file')
  }
}

