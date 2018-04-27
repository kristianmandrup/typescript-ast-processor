import { BaseMatcher } from './base'
import { isFunction } from 'util'

export function createListMatcher(expr: any, options: any = {}) {
  return new ListMatcher(expr, options)
}

export class ListMatcher extends BaseMatcher {
  matcher: BaseMatcher

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
    return isFunction(this.expr)
  }

  /**
   * Match each item in list
   * @param list
   */
  match(list: any[]) {
    return list[this.iterator]((value: any) => {
      return this.matcher.match(value)
    })
  }
}
