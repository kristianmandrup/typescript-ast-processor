import * as ts from 'typescript'
import { applyReplacements, SourceTextReplacement } from './replacement'
import { SrcFile } from '../src-file'
import { Loggable } from '../loggable'
import { DataCollector } from '../collector'

export class Instrumentor extends Loggable {
  replacements = [] as SourceTextReplacement[]

  // ??
  declaration = 'declare function $_$twiz(name: string, value: any, pos: number, filename: string, opts: any): void;\n'
  fileName: string
  srcFile: SrcFile
  collector: DataCollector

  /**
   * Create Instrumentor
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
    this.srcFile = options.srcFile
    this.fileName = options.srcFile.fileName
    this.collector = options.collector
  }

  /**
   * Get source text
   */
  get sourceText() {
    return this.srcFile.sourceText
  }

  /**
   * Instrument source using replacements
   */
  instrument() {
    const { replacements } = this
    if (replacements.length) {
      replacements.push(SourceTextReplacement.insert(0, this.declaration))
    }
    return applyReplacements(this.sourceText, replacements)
  }
}
