import { BaseMatcher } from './base'
import { isStr } from '../../../util'
export function createStringMatcher(expr: any, options: any = {}) {
  return new StringMatcher(expr, options)
}

export class StringMatcher extends BaseMatcher {
  expr: string

  /**
   * Determine if expression is valid for this matcher
   */
  isValid() {
    return isStr(this.expr)
  }

  /**
   *
   * @param value
   */
  match(value: any, expr?: any) {
    expr = expr || this.expr
    return expr === value
  }
}
