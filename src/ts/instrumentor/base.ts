import * as ts from 'typescript'
import {
  applyReplacements,
  Replacement
} from './replacement';
import { SrcFile } from '../src-file';
import { Loggable } from '../loggable';
import { DataCollector } from '../collector';

export class Instrumentor extends Loggable {
  replacements = [] as Replacement[]

  // ??
  declaration = 'declare function $_$twiz(name: string, value: any, pos: number, filename: string, opts: any): void;\n';
  fileName: string
  srcFile: SrcFile
  collector: DataCollector

  constructor(options: any) {
    super(options)
    this.srcFile = options.srcFile
    this.fileName = options.srcFile.fileName
    this.collector = options.collector
  }

  get source() {
    return this.srcFile.sourceText
  }

  instrument() {
    const { replacements } = this
    if (replacements.length) {
      replacements.push(Replacement.insert(0, this.declaration))
    }
    return applyReplacements(this.source, replacements)
  }
}
