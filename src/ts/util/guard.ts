import {
  isFunction
} from './is'

export function onGuard(testOrVal: any, valueOrFun: any) {
  const val = isFunction(testOrVal) ? testOrVal(valueOrFun) : valueOrFun
  return val ? valueOrFun() : undefined
}
