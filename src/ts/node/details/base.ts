import { Loggable } from '../../loggable'
import {
  nodeTypeCheckName
} from '../../util'

export class BaseDetailsTester extends Loggable {
  checkers: any = {}

  constructor(options: any) {
    super(options)
  }

  test(node: any, names: any, method: string = 'any') {
    method = method === 'all' ? 'hasAll' : 'hasAny'
    return this[method](node, names)
  }

  hasAll(node: any, names: string[]) {
    return names.every(name => this.is(node, name))
  }

  hasAny(node: any, names: string[]) {
    return names.find(name => this.is(node, name))
  }


  is(node: any, name: string) {
    name = nodeTypeCheckName(name)
    const fun = this.checkers[name]
    return fun && fun(node)
  }
}

