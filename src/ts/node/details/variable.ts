import { CheckFlag } from './flag'
import {
  callFun
} from '../../util'

export class VariableTester {
  varFlags: any

  constructor(options: any) {
    this.varFlags = new CheckFlag(options).variable
  }

  test(node: any, flag: string) {
    const varCheck = this.varFlags[flag]
    return callFun(varCheck, node)
  }
}
