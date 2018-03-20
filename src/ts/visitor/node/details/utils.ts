import * as utils from 'tsutils'
import { BaseDetailsTester } from './base'
import {
  onGuard,
  assignKeyDefined
} from '../../node/util'

export class CheckViaUtils extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.checkers = Object.keys(utils).reduce((acc: any, key: string) => {
      const fun = onGuard(() => /^is/.test(key), utils[key])
      return assignKeyDefined(acc, key, fun)
    }, this.checkers)
  }
}

