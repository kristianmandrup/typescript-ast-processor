import { isRegExp } from '../../../util'

import { BaseMatcher } from './base'

export function createRegExprMatcher(expr: any, options: any = {}) {
  return new RegExprMatcher(expr, options)
}

export class RegExprMatcher extends BaseMatcher {
  expr: RegExp

  /**
   * Determine if expression is valid for this matcher
   */
  isValid() {
    return isRegExp(this.expr)
  }

  match(value: any) {
    return this.expr.test(value)
  }
}
