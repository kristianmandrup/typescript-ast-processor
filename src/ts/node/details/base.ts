import { Loggable } from '../../loggable'
import {
  callFun
} from '../../util'

export class BaseDetailsTester extends Loggable {
  checkers: any = {}

  constructor(options: any) {
    super(options)
  }

  nodeTypeCheckName(name: string) {
    return name[0].toLowerCase() + name.slice(1)
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
    // console.log('is', {
    //   node,
    //   name,
    //   checkers: this.checkers,
    //   abstract: this.checkers[name]
    // })
    name = this.nodeTypeCheckName(name)
    const fun = this.checkers[name]
    // console.log({
    //   name,
    //   fun
    // })
    return callFun(fun, node)
  }
}

