import {
  isFunction
} from './is'

export function callFun(maybeFun: Function, ...args: any[]) {
  return isFunction(maybeFun) && maybeFun(...args)
}
