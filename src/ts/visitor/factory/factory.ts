import { BaseFactory } from './base'
import {
  FunctionLikeTester,
  ClassTester
} from '../../node/tester';
import {
  toList
} from '../../util'

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
    getter: ['GetAccessor', 'MethodOrAccessor'],
    setter: ['SetAccessor', 'MethodOrAccessor'],
    methodLike: 'MethodOrAccessor',
    class: 'ClassDeclaration',
    namespace: 'NamespaceExportDeclaration'
  }
}

export function createVisitorFactory(options: any) {
  return new VisitorFactory(options)
}

export class VisitorFactory extends BaseFactory {
  classTest: ClassTester
  functionTest: FunctionLikeTester
  factory: {} // contains all registered factory methods

  constructor(options: any = {}) {
    super(options)
    this.classTest = new ClassTester(options)
    this.functionTest = new FunctionLikeTester(options)
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
      return this.generic({
        types,
        name,
        opts,
        cb
      })
    }
  }
}
