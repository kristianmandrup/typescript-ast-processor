import { isFunction } from '../../../util'

/**
 * Similar to nameMatch but for non-string values
 * @param value
 * @param matcher
 */
export function valueMatch(value: any, matcher: any | Function) {
  if (isFunction(matcher)) (matcher as Function)(value)
  return value === matcher
}

/**
 * Create a function to perform a value test by query on a node
 * @param query
 */
export function createValueTest(query: any) {
  return (nodeValue: any) => {
    const matchers = query.anyOf || query || []
    return matchers.find((match: any) => {
      return valueMatch(nodeValue, match)
    })
  }
}

export function testValue(value: any, query: any): boolean {
  const valueTest = createValueTest(query.value || query)
  return valueTest(value)
}
