import {
  Source
} from './source'
import * as ts from 'typescript'
import {
  ISourceFileOpts
} from './interfaces'

import {
  compilerOpts
} from './opts/compiler'

const defaults = {
  compilerOpts
}

import { Parser } from './parser';

export function createSrcFile(options: any) {
  return new SrcFile(options)
}

export class SrcFile extends Source {
  compilerOpts: ts.CompilerOptions
  languageVersion: ts.ScriptTarget
  fileNames: string[] = []
  tsFileNames: string[] = []
  fileName: string
  sourceFile: ts.SourceFile
  sourceText: string

  constructor(options: any) {
    super(options)
    this.compilerOpts = options.compiler || defaults.compilerOpts
    this.languageVersion = this.scriptTargetFor(options.languageVersion)
  }

  scriptTargetFor(languageVersion: string) {
    return ts.ScriptTarget.Latest
  }

  /**
   * Check if this is a TypeScript file based on extension
   * @param fileName
   */
  isTsFile(fileName: string): boolean {
    return fileName.endsWith('.ts') || fileName.endsWith('.tsx')
  }


  /**
   * Validate that we have any source files
   */
  validateSrcFiles(): any {
    return this.tsFileNames.length > 0 || this.error('No TypeScript files found', {
      fileNames: this.fileNames
    })
  }

  loadSourceFile(fileName: string): SrcFile {
    if (!this.isTsFile(fileName)) {
      this.error('Not a valid TypeScript file extension', {
        fileName
      })
    }
    this.fileName = fileName
    this.createSourceFile({ fileName })
    return this
  }

  /**
   *
   * @param options
   */
  createSourceFile(options: ISourceFileOpts): ts.SourceFile {
    this.sourceText = this.sourceTextFor(options)
    this.sourceFile = ts.createSourceFile(options.fileName, this.sourceText, this.languageVersion, true)
    return this.sourceFile
  }

  readSourceText(fileName: string) {
    return this.fs.readFileSync(fileName).toString()
  }

  sourceTextFor(options: ISourceFileOpts) {
    const {
      fileName,
      sourceText
    } = options
    return sourceText ? sourceText : this.readSourceText(fileName)
  }


  get parser() {
    return new Parser(this)
  }

  parse(sourceFile?: ts.SourceFile) {
    sourceFile = sourceFile || this.sourceFile
    return sourceFile ? this.parser.parse(sourceFile) : this.error('missing source file')
  }
}

