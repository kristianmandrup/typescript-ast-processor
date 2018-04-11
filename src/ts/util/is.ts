export function isDefined(val: any) {
  return val !== undefined && val !== null
}

export function isFunction(val: any) {
  return typeof val === 'function'
}

export function isStr(val: any) {
  return typeof val === 'string'
}

export function isNonEmptyStr(val: any) {
  return typeof val === 'string' && !isEmpty(val)
}

export function isRegExp(val: any) {
  return val instanceof RegExp
}

export function isArray(val: any) {
  return Array.isArray(val)
}

export function isObject(obj: any) {
  return obj === Object(obj);
}

// on string or object
export function isEmpty(val: any) {
  if (!isDefined(val)) return true
  if (isStr(val)) {
    return val.trim().length === 0
  }
  if (Array.isArray(val)) return val

  if (isObject(val)) return Object.keys(val).length === 0
}
