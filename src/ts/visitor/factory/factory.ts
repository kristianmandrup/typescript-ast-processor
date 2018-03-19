// import * as ts from 'typescript'
import { BaseFactory } from './base'
import { FunctionTester, ClassTester } from './tester';

export class VisitorFactory extends BaseFactory {
  classTest: ClassTester
  functionTest: FunctionTester

  constructor(options: any) {
    super(options)
    this.classTest = new ClassTester(options)
    this.functionTest = new FunctionTester(options)
  }

  aFunction(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'FunctionDeclaration' })
  }

  aFunctionCall(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'FunctionCall' })
  }

  aMethod(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'MethodDeclaration', test })
  }

  aProperty(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'PropertyDeclaration', test })
  }

  aVariable(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'VariableDeclaration', test })
  }

  aConst(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'Const', test })
  }

  aLet(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'Let', test })
  }

  anImport(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'ImportDeclaration', test })
  }

  anExport(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'ExportDeclaration', test })
  }

  aGetter(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'GetAccessor', test })
  }

  aSetter(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'SetAccessor', test })
  }

  aMethodOrAccessor(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'MethodOrAccessor', name, test }, cb)
  }

  aClass(name: string, opts: any, cb: Function) {
    return this.aNamed({ type: 'ClassDeclaration', test })
  }
}
