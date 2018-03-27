import {
  isArray,
  isObject,
  isStr
} from './is'

export function enumKeys(E: any) {
  return Object.keys(E).filter(k => typeof E[k as any] === 'number')
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
