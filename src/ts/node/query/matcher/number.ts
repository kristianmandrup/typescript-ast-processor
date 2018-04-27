import { BaseMatcher } from './base'

export function createNumberMatcher(options: any = {}, expr?: any) {
  return new NumberMatcher(options, expr)
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
    return this.expr === value
  }
}
