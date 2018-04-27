import { BaseMatcher, IValueMatcher } from './base'
import { createMatcherSelector } from './selector'

export function createListMatcher(options: any = {}, matcher?: any) {
  return new ListMatcher(options, matcher)
}

export class ListMatcher extends BaseMatcher {
  matcher: IValueMatcher | undefined

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
  isValid() {
    return true
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
