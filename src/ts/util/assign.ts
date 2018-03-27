import {
  isDefined
} from './is'

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
