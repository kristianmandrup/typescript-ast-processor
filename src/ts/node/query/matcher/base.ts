import { Loggable } from '../../../loggable'
import { ILoggable } from '../../../loggable/loggable'

export interface IValueMatcher extends ILoggable {
  match(value: any): boolean
  setQueryExpr(query: any): IValueMatcher
}

export class BaseMatcher extends Loggable implements IValueMatcher {
  expr: any

  constructor(options: any = {}, expr: any) {
    super(options)
    this.expr = expr
    this.init()
  }

  init() {
    const { options } = this
    const expr = this.expr || options.expr || options.query
    if (expr) this.setQueryExpr(expr)
  }

  setQueryExpr(expr: any): IValueMatcher {
    this.expr = expr
    this.validate()
    return this
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
