export function isFunction(val: any) {
  return typeof val === 'function'
}

export function callFun(maybeFun: Function) {
  return isFunction(maybeFun) && maybeFun()
}

export function enumKeys(E: any) {
  return Object.keys(E).filter(k => typeof E[k as any] === 'number')
}
