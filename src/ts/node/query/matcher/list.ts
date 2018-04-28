import { BaseMatcher, IValueMatcher } from './base'
import { createMatcherSelector } from './selector'
import { toList } from '../../../util'

export function createListTester(options: any) {
  return (expr: any, value: any) => {
    return createListMatcher({
      ...options,
      expr,
    }).match(value)
  }
}

export function createListMatcher(options: any = {}, matcher?: any) {
  return new ListMatcher(options, matcher)
}

export class ListMatcher extends BaseMatcher {
  matcher: IValueMatcher | undefined

  /**
   * Initialize
   */
  init() {
    super.init()
    this.matcher = this.selectMatcher(this.expr)
  }

  /**
   * Select matcher to be used for query, based on type of expr
   * @param expr
   */
  selectMatcher(expr?: any): IValueMatcher | undefined {
    expr = expr || this.expr
    return createMatcherSelector(this.options).select(expr)
  }

  /**
   * Check if valid list iterator
   */
  get isValidIterator(): boolean {
    return ['find', 'every'].includes(this.iterator)
  }

  /**
   * The default iterator function name
   */
  get defaultIterator(): string {
    return 'every'
  }

  /**
   * Get iterator passed in or default iterator
   */
  get iterator(): string {
    return this.options.iterator || this.defaultIterator
  }

  /**
   * Get iterator function name to loop through list of values to find match
   * Either tests all or finds first (any) matching
   */
  get listIteratorFn(): string {
    return this.isValidIterator ? this.iterator : this.defaultIterator
  }

  /**
   * Determine if expression is valid for this matcher
   */
  isValidExpr() {
    return true
  }

  /**
   * normalize value
   * @param value
   */
  normalizeValue(value: any): any[] {
    return toList(value)
  }

  /**
   * Match each item in list
   * @param list
   */
  match(list: any[]) {
    const { matcher } = this
    if (!matcher) return false
    return list[this.iterator]((value: any) => {
      return matcher.match(value)
    })
  }
}
