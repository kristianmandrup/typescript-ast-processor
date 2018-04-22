import { isFunction } from './is'

export function callFun(maybeFun: Function, ...args: any[]) {
  if (!isFunction(maybeFun)) return
  return maybeFun(...args)
}
