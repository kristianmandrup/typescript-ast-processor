export { IQueryMatcher, IQuery, BaseQueryMatcher } from './base'
export { createAnyQueryMatcher, AnyQueryMatcher } from './any'
export { createAllQueryMatcher, AllQueryMatcher } from './all'
export { createExactQueryMatcher, ExactQueryMatcher } from './exact'
import * as matcher from './matcher'
import * as boolean from './boolean'

export { boolean, matcher }
