import {
  isFunction
} from '../../../util'

export function valueMatch(value: any, matcher: any | Function) {
  if (isFunction(matcher)) (matcher as Function)(value)
  return value === matcher
}


export function createValueTest(nameQuery: any) {
  return (nodeValue: any) => {
    const nameMatchers = nameQuery.anyOf || []
    return nameMatchers.find((match: any) => {
      return valueMatch(nodeValue, match)
    })
  }
}

export function testValue(value: any, query: any): boolean {
  const nameTest = createValueTest(query.value || query)
  return nameTest(value)
}
