import { BaseMatcher } from './base'
import { isFunction } from 'util'

export function createFunctionMatcher(expr: any, options: any = {}) {
  return new FunctionMatcher(expr, options)
}

export class FunctionMatcher extends BaseMatcher {
  expr: Function

  /**
   * Determine if expression is valid for this matcher
   */
  isValid() {
    return isFunction(this.expr)
  }

  match(value: any) {
    return Boolean(this.expr(value))
  }
}
