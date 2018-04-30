import { BaseMatcher } from './base'
import { isStr } from '../../../util'

export function createStringMatcher(options: any = {}, expr?: any) {
  return new StringMatcher(options, expr)
}

export class StringMatcher extends BaseMatcher {
  expr: string

  /**
   * Determine if expression is valid for this matcher
   */
  isValidExpr() {
    return isStr(this.expr)
  }

  isValidValue(value: string) {
    return isStr(value)
  }
}
