import { Loggable } from '../../loggable'
import {
  callFun
} from '../../util'
import {
  queryNode
} from '../tester/util'

export class BaseDetailsTester extends Loggable {
  checkers: any = {}

  constructor(options: any) {
    super(options)
  }

  nodeTypeCheckName(name: string) {
    return name[0].toLowerCase() + name.slice(1)
  }

  testNames(node: any, names: any, method: string = 'any') {
    method = method === 'all' ? 'allOf' : 'anyOf'
    return this.test(node, {
      [method]: names
    })
  }

  test(node: any, query: any) {
    return queryNode(node, query, this.is.bind(this))
  }

  is(node: any, name: string) {
    name = this.nodeTypeCheckName(name)
    const fun = this.checkers[name]
    return callFun(fun, node)
  }
}

