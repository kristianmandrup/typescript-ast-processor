import { CheckFlag } from './flag'
import {
  callFun
} from '../../util'

export class NamespaceTester {
  namespaceFlags: any

  constructor(options: any) {
    this.namespaceFlags = new CheckFlag(options).namespace
  }

  test(node: any, flag: string) {
    const namespaceCheck = this.namespaceFlags[flag]
    return callFun(namespaceCheck, node)
  }
}
