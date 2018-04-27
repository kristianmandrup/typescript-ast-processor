import { Loggable } from '../../../loggable'

export interface IValueMatcher {
  match(value: any): boolean
}

export class BaseMatcher extends Loggable implements IValueMatcher {
  expr: any

  constructor(expr: any, options: any = {}) {
    super(options)
    this.expr = expr
    this.validate()
  }

  /**
   * Determine if expression is valid for this matcher
   */
  isValid() {
    return true
  }

  /**
   *
   * @param expr
   */
  validate() {
    if (!this.isValid()) {
      this.error('invalid expression', {
        expr: this.expr,
      })
    }
  }

  /**
   * Match node value via expression
   * @param value the value to match
   * @returns { boolean }
   */
  match(value: any): boolean {
    return true
  }
}
