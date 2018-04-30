import {
  keysOf,
} from '../../../../util'

const testMethodMap = {
  find: ['one', 'any', 'anyOf', 'oneOf'],
  every: ['exactly', 'all', 'allOf']
}

interface IResolvedArrayIterator {
  queryKey: string
  iteratorMethod: string
}

/**
 * Iterate through methodKeys to find one that matches in testMethodMap
 *
 * @param methodKeys
 * @param keys
 * @returns { string} Array iteration method name, such as find or every
 */
function resolveMethod(methodKeys: string[], keys: string[]): IResolvedArrayIterator {
  let queryKey: string = keys[0]
  let iteratorMethod: string = 'find'

  const foundIteratorMethod = methodKeys.find((methodKey: string) => {
    const foundKey = keys.find(key => {
      return testMethodMap[methodKey].includes(key)
    })
    queryKey = foundKey || queryKey
    return Boolean(queryKey)
  })
  iteratorMethod = foundIteratorMethod || iteratorMethod
  return {
    queryKey,
    iteratorMethod
  }
}

/**
 * TODO:
 * Not sure what this is used for, but seems to be pretty essential
 * Check where it is used and create unit test to test it for real!
 * @param obj
 * @param options
 */
export function resolveArrayIteratorFindMethod(query: any, options: any = {}): IResolvedArrayIterator | undefined {
  const {
    error
  } = options
  if (!query) return
  const keys: string[] = keysOf(query)
  const methodKeys: string[] = Object.keys(testMethodMap)
  const result = resolveMethod(methodKeys, keys)
  if (!result) {
    error && error(`resolveArrayIteratorFindMethod: Invalid query ${query}`, result)
  }
  return result
}


