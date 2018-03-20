import { Loggable } from '../../loggable'
import {
  nodeTypeCheckName
} from '../../util'

export class BaseDetailsTester extends Loggable {
  checkers: any = {}

  constructor(options: any) {
    super(options)
  }

  is(node: any, name: string) {
    name = nodeTypeCheckName(name)
    const fun = this.checkers[name]
    return fun && fun(node)
  }
}

