import { BaseMatcher } from './base'
import { isObject } from '../../../util'

export function createRangeMatcher(expr: any, options: any = {}) {
  return new RangeMatcher(expr, options)
}

export class RangeMatcher extends BaseMatcher {
  expr: any

  /**
   * Determine if expression is valid for this matcher
   */
  isValid() {
    return (isObject(this.expr) && this.expr.min) || this.expr.max
  }

  /**
   * Match range (min, max)
   * @param value
   */
  match(value: any, expr?: any) {
    const { min, max } = expr || this.expr
    return value >= min && value <= max
  }
}
