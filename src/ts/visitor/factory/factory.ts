import { BaseFactory } from './base'
import {
  FunctionTester,
  ClassTester
} from './tester';

export class VisitorFactory extends BaseFactory {
  classTest: ClassTester
  functionTest: FunctionTester

  constructor(options: any = {}) {
    super(options)
    this.classTest = new ClassTester(options)
    this.functionTest = new FunctionTester(options)
  }

  aFunction(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'FunctionDeclaration',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)
  }

  aFunctionCall(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'FunctionCall',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)
  }

  aMethod(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'MethodDeclaration',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)
  }

  aProperty(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'PropertyDeclaration',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)
  }

  aVariable(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'VariableDeclaration',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)

  }

  aConst(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'Const',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)

  }

  aLet(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'Let',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)
  }

  anImport(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'ImportDeclaration',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)
  }

  anExport(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'ExportDeclaration',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)
  }

  aGetter(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'GetAccessor',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)
  }

  aSetter(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'SetAccessor',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)
  }

  aMethodOrAccessor(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'MethodOrAccessor',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)
  }

  aClass(name: string, opts: any = {}, cb: Function) {
    return this.aNamed({
      type: 'ClassDeclaration',
      name,
      filters: opts.filters, // additional filters
      cbs: opts.cbs // add onVisit and collect callbacks here
    }, cb)
  }
}
