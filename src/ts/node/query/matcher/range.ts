import { BaseMatcher } from './base'
import { isObject } from '../../../util'
import { isNumber } from 'util'

export function createRangeMatcher(options: any = {}, expr?: any) {
  return new RangeMatcher(options, expr)
}

export class RangeMatcher extends BaseMatcher {
  expr: any

  /**
   * Determine if expression is valid for this matcher
   */
  isValidExpr() {
    return isObject(this.expr) && (this.expr.min || this.expr.max)
  }

  isValidValue(value: string) {
    return isNumber(value)
  }

  /**
   * Match range (min, max)
   * @param value
   */
  test(value: any, expr: any) {
    const { min, max } = expr
    return value >= (min || 0) && value <= (max || 9999)
  }
}
