export function isFunction(val: any) {
  return typeof val === 'function'
}

export function isStr(val: any) {
  return typeof val === 'string'
}

// on string or object
export function isEmpty(val: any) {
  const testObj = isStr(val) || Array.isArray(val) ? val : Object.keys(val)
  return testObj.length === 0
}


export function callFun(maybeFun: Function, ...args: any[]) {
  return isFunction(maybeFun) && maybeFun(...args)
}

export function enumKeys(E: any) {
  return Object.keys(E).filter(k => typeof E[k as any] === 'number')
}
