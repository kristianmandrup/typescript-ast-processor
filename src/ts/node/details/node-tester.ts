import {
  CheckModifier,
} from './modifier'
import {
  CheckFlag
} from './flag';
import { CheckViaUtils } from './utils'

import {
  assignKeyDefined
} from '../../util'


export class NodeDetailsTester {
  modifer: CheckModifier
  flag: CheckFlag
  utils: CheckViaUtils
  checkers: any

  constructor(options: any) {
    this.checkers = {
      utils: new CheckViaUtils(options),
      modifer: new CheckModifier(options),
      flag: new CheckFlag(options),
    }
  }

  addChecker(checker: any, name?: string) {
    name = name || checker.name
    assignKeyDefined(this.checkers, name, checker)
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