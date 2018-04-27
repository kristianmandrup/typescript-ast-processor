import { BaseMatcher } from './base'
import { isObject } from '../../../util'

export function createRangeMatcher(options: any = {}, expr?: any) {
  return new RangeMatcher(options, expr)
}

export class RangeMatcher extends BaseMatcher {
  expr: any

  /**
   * Determine if expression is valid for this matcher
   */
  isValid() {
    return isObject(this.expr) && (this.expr.min || this.expr.max)
  }

  /**
   * Match range (min, max)
   * @param value
   */
  match(value: any, expr?: any) {
    const { min, max } = expr || this.expr
    return value >= (min || 0) && value <= (max || 9999)
  }
}
