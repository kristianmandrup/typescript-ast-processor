import { BaseMatcher } from './base'
import { isFunction } from 'util'

export function createFunctionMatcher(options: any = {}, expr?: any) {
  return new FunctionMatcher(options, expr)
}

export class FunctionMatcher extends BaseMatcher {
  expr: Function

  /**
   * Determine if expression is valid for this matcher
   */
  isValid() {
    return isFunction(this.expr)
  }

  /**
   *
   * @param value
   */
  match(value: any, matchFn?: Function): boolean {
    matchFn = matchFn || this.expr
    if (!matchFn) {
      this.error('match: missing match function', {
        matchFn,
      })
    }
    return Boolean(matchFn(value))
  }
}
