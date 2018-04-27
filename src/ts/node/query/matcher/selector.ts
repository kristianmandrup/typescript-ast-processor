import {
  createFunctionMatcher,
  createStringMatcher,
  createNumberMatcher,
  createListMatcher,
  createRangeMatcher,
  createRegExprMatcher,
} from './exports'
import { toList, isArray } from '../../../util'
import { findDerived } from 'find-derived'
import { Loggable } from '../../../loggable'
import { isRegExp } from 'util'
import { BaseMatcher } from './base'

const matcherTypeFactoryMap = {
  string: createStringMatcher,
  function: createFunctionMatcher,
  number: createNumberMatcher,
  range: createRangeMatcher,
  regexp: createRegExprMatcher,
  array: createListMatcher,
}

export function createMatcherSelector(options: any = {}) {
  return new MatcherSelector(options)
}

export class MatcherSelector extends Loggable {
  matcherTypeFactoryMap: any = matcherTypeFactoryMap

  /**
   * Resolve more detailed type of object
   * @param value
   */
  resolveObjectType(value: any): string {
    if (isRegExp(value)) return 'regexp'
    if (isArray(value)) return 'array'
    if (value.min || value.max) return 'range'
    return 'object'
  }

  /**
   * Resolve the type of value
   * @param value
   */
  resolveType(value: any): string {
    const type = typeof value
    return type === 'object' ? this.resolveObjectType(value) : type
  }

  /**
   * determine type, then try to create each matcher for that type until one is valid
   * @param value
   */
  select(value: any) {
    const type = this.resolveType(value)
    const typeMatcherFactories = this.matcherTypeFactoryMap[type]
    if (!typeMatcherFactories) {
      this.error('select: invalid type', {
        type,
        value,
        factoryMap: matcherTypeFactoryMap,
      })
    }
    return this.selectMatcher(typeMatcherFactories, value)
  }

  /**
   * Select appropriate matcher for the value
   * @param typeMatcherFactories
   * @param value
   */
  selectMatcher(typeMatcherFactories: any, value: any): any {
    return findDerived(
      toList(typeMatcherFactories),
      (createMatcher: Function) => {
        return this.testMatcherFactory(createMatcher, value)
      },
    )
  }

  /**
   * Test if matcher factory is valid for this value
   * @param factoryFn
   * @param value
   */
  testMatcherFactory(factoryFn: Function, value: any): BaseMatcher | boolean {
    try {
      return factoryFn(value)
    } catch (e) {
      return false
    }
  }
}
