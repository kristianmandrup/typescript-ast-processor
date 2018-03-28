import { SourceTextReplacement } from '../replacement'
import { SrcFile } from '../../src-file'

export class BaseReplacer {
  replacements: SourceTextReplacement[]

  constructor(public srcFile: SrcFile) {
  }

  replace(position: number, replaceWith: string) {
    const { replacements } = this
    const replacement = SourceTextReplacement.insert(position, replaceWith)
    replacements.push(replacement)
  }
}
