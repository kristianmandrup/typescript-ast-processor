import * as details from './exports'
import {
  callFun
} from '../../util'

export const factories = {
  'expr.binary': details.binary.createBinaryExprTester,
  'function.call': details.call.createCallTester,
  identifier: details.identifier.createIdentifierTester,
  variable: details.variable.createVariableTester,
  class: details.class.createClassDetailsTester,
  namespace: details.namespace.createNamespaceTester,
  'function.decl': details.function.createFunctionTester,
  'class.accessor': details.access.createAccessTester
}

import {
  IDetailsTester
} from './base'

export type IDetailsTesterFactory = (options: any) => IDetailsTester

export function factoryFor(name: string, $factoryMap?: any): IDetailsTesterFactory {
  $factoryMap = $factoryMap || factories
  return $factoryMap[name]
}

export function createTester(factoryName: string, node: any, options: any = {}): IDetailsTester | undefined {
  options.factories = options.factories || {}
  const testerFactory = factoryFor(factoryName, options.factories.tester)
  return callFun(testerFactory, options)
}
