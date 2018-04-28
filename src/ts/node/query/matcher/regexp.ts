import { isRegExp } from '../../../util'

import { BaseMatcher } from './base'

export function createRegExprMatcher(options: any = {}, expr?: any) {
  return new RegExprMatcher(options, expr)
}

export class RegExprMatcher extends BaseMatcher {
  expr: RegExp

  /**
   * Determine if expression is valid for this matcher
   */
  isValid() {
    return isRegExp(this.expr)
  }

  test(value: any, expr: any) {
    return expr.test(value)
  }
}
