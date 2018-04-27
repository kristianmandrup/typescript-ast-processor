import { BaseMatcher } from './base'

export function createNumberMatcher(expr: any, options: any = {}) {
  return new NumberMatcher(expr, options)
}

export class NumberMatcher extends BaseMatcher {
  expr: number

  /**
   * Determine if expression is valid for this matcher
   */
  isValid() {
    return !isNaN(this.expr)
  }

  /**
   * match number
   * @param value
   * @param expr
   */
  match(value: any, expr?: any) {
    expr = expr || this.expr
    this.log('match', {
      value,
      expr,
    })
    return this.expr === value
  }
}
