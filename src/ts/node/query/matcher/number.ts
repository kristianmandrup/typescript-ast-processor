import { BaseMatcher } from './base'
import { isNumber, isArray } from 'util'

export function createNumberMatcher(options: any = {}, expr?: any) {
  return new NumberMatcher(options, expr)
}

export class NumberMatcher extends BaseMatcher {
  expr: number

  /**
   * Determine if expression is valid for this matcher
   */
  isValidExpr() {
    return isNumber(this.expr)
  }

  /**
   * Test if valid value to be matched by this matcher
   * @param value
   */
  isValidValue(value: any) {
    return isArray(value)
  }
}
