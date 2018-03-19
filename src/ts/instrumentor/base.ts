import * as ts from 'typescript'
import {
  applyReplacements,
  Replacement
} from './replacement';
import { SrcFile } from '../src-file';

export class BaseInstrumentor {
  replacements = [] as Replacement[]

  // ??
  declaration = 'declare function $_$twiz(name: string, value: any, pos: number, filename: string, opts: any): void;\n';

  constructor(public srcFile: SrcFile) {
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
