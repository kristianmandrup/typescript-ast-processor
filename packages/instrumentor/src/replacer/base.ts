import { SourceTextReplacement } from '../replacement'
import { SrcFile } from '../../src-file'

export class BaseReplacer {
  replacements: SourceTextReplacement[]

  /**
   * Create replacer
   * @constant
   * @param srcFile
   */
  constructor(public srcFile: SrcFile) {}

  /**
   * Replace source text at position
   * @param position
   * @param replaceWith
   */
  replace(position: number, replaceWith: string) {
    const { replacements } = this
    const replacement = SourceTextReplacement.insert(position, replaceWith)
    replacements.push(replacement)
  }
}
