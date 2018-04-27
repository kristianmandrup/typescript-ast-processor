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

  get min() {
    return this.expr.min
  }

  get max() {
    return this.expr.min
  }

  match(value: any) {
    return value >= this.min && value <= this.max
  }
}
