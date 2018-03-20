import { BaseFactory } from './base'
import {
  FunctionTester,
  ClassTester
} from './tester';
import {
  toList
} from '../node/util'

const defaults = {
  registry: {
    function: 'FunctionDeclaration',
    call: 'FunctionCall',
    method: 'MethodDeclaration',
    property: 'PropertyDeclaration',
    variable: 'VariableDeclaration',
    const: ['VariableDeclaration', 'Const'],
    let: ['VariableDeclaration', 'Let'],
    import: 'ImportDeclaration',
    export: 'ExportDeclaration',
    getter: 'GetAccessor',
    setter: 'SetAccessor',
    methodLike: 'MethodOrAccessor',
    class: 'ClassDeclaration'
  }
}

export class VisitorFactory extends BaseFactory {
  classTest: ClassTester
  functionTest: FunctionTester
  factory: {} // contains all registered factory methods

  constructor(options: any = {}) {
    super(options)
    this.classTest = new ClassTester(options)
    this.functionTest = new FunctionTester(options)
  }

  registerAllFactories(registry: any) {
    registry = registry || defaults.registry
    Object.keys(registry).map(key => {
      this.registerFactory(key, toList(registry[key]))
    })
  }

  registerFactory(name: string, types: string[]) {
    // opts may contain test object and cbs object
    this.factory[name] = (name: string, opts: any = {}, cb: Function) => {
      return this.named({
        types,
        name,
        opts,
        cb
      })
    }
  }
}
