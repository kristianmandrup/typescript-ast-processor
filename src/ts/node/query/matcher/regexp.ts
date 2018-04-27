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

  /**
   * Match RegExp query expr
   * @param value
   */
  match(value: any, expr?: any) {
    expr = expr || this.expr
    return expr.test(value)
  }
}
