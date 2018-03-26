function createTypeCheckName(name: string) {
  return `is${capitalize(name)}`
}

export function nodeTypeCheckName(name: string) {
  return /^is[A-Z]/.test(name) ? name : createTypeCheckName(name)
}

export function onGuard(testOrVal: any, valueOrFun: any) {
  const val = isFunction(testOrVal) ? testOrVal(valueOrFun) : valueOrFun
  return val ? valueOrFun() : undefined
}

export function assign(target: any, value: any) {
  target = value
  return target
}

export function assignTruthy(target: any, value: any) {
  target = value
  return target
}

export function assignDefined(target: any, value: any) {
  return isDefined(value) && assign(target, value)
}

export function assignKeyDefined(obj: any, key: any, value: any) {
  assignDefined(obj[key], value)
  return obj
}

export function isDefined(val: any) {
  return val !== undefined && val !== null
}

export function capitalize(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}

export function isFunction(val: any) {
  return typeof val === 'function'
}

export function isStr(val: any) {
  return typeof val === 'string'
}

export function isArray(val: any) {
  return Array.isArray(val)
}

export function isObject(obj: any) {
  return obj === Object(obj);
}

export function toList(val: any) {
  return isArray(val) ? val : [val]
}

export function keysOf(val: any) {
  if (isArray(val)) return val
  if (isObject(val)) return Object.keys(val)
  if (isStr(val)) return [val]
  throw new Error(`keysOf: No keys can be extracted from ${val}`)
}


// on string or object
export function isEmpty(val: any) {
  if (!isDefined(val)) return true
  const testObj = isStr(val) || Array.isArray(val) ? val : Object.keys(val)
  return testObj.length === 0
}

export function flatten(list: any[]): any[] {
  return list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
  )
}

export const flatMap = (f: any, xs: any) =>
  xs.reduce((acc: any[], x: any) =>
    acc.concat(f(x)), [])


export function callFun(maybeFun: Function, ...args: any[]) {
  return isFunction(maybeFun) && maybeFun(...args)
}

export function enumKeys(E: any) {
  return Object.keys(E).filter(k => typeof E[k as any] === 'number')
}
