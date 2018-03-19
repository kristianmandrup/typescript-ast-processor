import { Replacement } from '../replacement'
import { SrcFile } from '../../src-file'

export class BaseReplacer {
  replacements: Replacement[]

  constructor(public srcFile: SrcFile) {
  }

  replace(position: number, replaceWith: string) {
    const { replacements } = this
    const replacement = Replacement.insert(position, replaceWith)
    replacements.push(replacement)
  }
}
