import {
  CheckModifier
} from './modifier'
import {
  Loop
} from './loop'

import {
  CheckFlag
} from './flag';
import { CheckViaUtils } from './utils'
import {
  assignKeyDefined
} from '../../../util'

export {
  CheckModifier,
  CheckFlag,
  Loop
}

export class NodeDetailsTester {
  modifer: CheckModifier
  flag: CheckFlag
  utils: CheckViaUtils
  _checkers: any

  constructor(options: any) {
    this._checkers = {
      // utils: new CheckViaUtils(options),
      modifier: new CheckModifier(options),
      flag: new CheckFlag(options),
    }
  }

  get checkers() {
    return this._checkers
  }

  addChecker(checker: any, name?: string) {
    name = name || checker.name
    assignKeyDefined(this._checkers, name, checker)
  }

  get checkerNames() {
    return Object.keys(this.checkers)
  }

  is(node: any, name: string) {
    this.checkerNames.find(name => {
      return this.checkers[name].is(node, name)
    })
  }
}
