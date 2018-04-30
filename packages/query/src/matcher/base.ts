import { Loggable } from '../../../loggable'
import { ILoggable } from '../../../loggable/loggable'
import { isDefined } from '../../../util'

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

  /**
   * Initialize
   */
  init() {
    const { options } = this
    const expr = this.expr || options.expr || options.query
    if (expr) this.setQueryExpr(expr)
  }

  /**
   * Set query expression to be used for match
   * @param expr
   */
  setQueryExpr(expr: any): IValueMatcher {
    this.expr = expr
    this.validate()
    return this
  }

  /**
   * Determine if expression is valid for this matcher
   */
  isValidExpr() {
    return true
  }

  /**
   *
   * @param expr
   */
  validate() {
    if (!this.isValidExpr()) {
      this.error('invalid expression', {
        expr: this.expr,
      })
    }
  }

  /**
   * Test if value is valid for this matcher context
   * Value should (normally) be defined to be tested
   * @param value
   */
  isValidValue(value: any) {
    return isDefined(value)
  }

  /**
   * normalize value
   * @param value
   */
  normalizeValue(value: any): any {
    return value
  }

  /**
   * Validate value to be tested
   * @param value
   */
  validateValue(value: any): any {
    value = this.normalizeValue(value)
    if (!this.isValidValue(value)) {
      this.error('validateValue: invalid value', {
        value,
      })
    }
    return value
  }

  /**
   * Match node value via expression
   * @param value the value to match
   * @returns { boolean }
   */
  match(value: any, expr?: any): boolean {
    value = this.validateValue(value)
    expr = expr || this.expr
    return this.test(value, expr)
  }

  /**
   * Generic (default) match test
   * @param value
   * @param expr
   */
  test(value: any, expr: any) {
    return expr === value
  }
}
