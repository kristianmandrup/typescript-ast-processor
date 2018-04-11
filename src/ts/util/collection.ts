import {
  isArray,
  isObject,
  isStr
} from './is'

export function enumKeys(E: any) {
  return Object.keys(E).filter(k => typeof E[k as any] === 'number')
}

/**
 * TODO: duplicate!
 * Get the enum key for an enum value in an enum structure
 * TODO: cache keys for next lookup in same enum?
 * @param enumRef
 * @param enumValue
 */
export function enumKey(enumRef: any, enumValue: any): string | undefined {
  for (var enumMember in enumRef) {
    if (enumRef[enumMember] == enumValue) return enumMember
  }
  return undefined
}

export function keysOf(val: any) {
  if (isArray(val)) return val
  if (isObject(val)) return Object.keys(val)
  if (isStr(val)) return [val]
  throw new Error(`keysOf: No keys can be extracted from ${val}`)
}

export function toList(val: any) {
  return isArray(val) ? val : [val]
}

export function flatten(list: any[]): any[] {
  return list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
  )
}

export const flatMap = (f: any, xs: any) =>
  xs.reduce((acc: any[], x: any) =>
    acc.concat(f(x)), [])
