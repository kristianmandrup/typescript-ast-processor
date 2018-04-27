import {
  createFunctionMatcher,
  createStringMatcher,
  createNumberMatcher,
  createListMatcher,
  createRangeMatcher,
  createRegExprMatcher,
} from './exports'

export const matcherTypeFactoryMap = {
  string: createStringMatcher,
  function: createFunctionMatcher,
  number: createNumberMatcher,
  range: createRangeMatcher,
  regexp: createRegExprMatcher,
  array: createListMatcher,
}
