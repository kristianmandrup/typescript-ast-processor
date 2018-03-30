import {
  AccessTester,
  createAccessTester
} from './access'
import {
  createFunctionTester,
  FunctionTester
} from './function'
import {
  createNamespaceTester,
  NamespaceTester
} from './namespace'
import {
  ClassDetailsTester,
  createClassDetailsTester
} from './class'
import {
  createVariableTester,
  VariableTester
} from './variable'
import {
  createIdentifierTester,
  IdentifierTester
} from './identifier'
import {
  createCallTester,
  CallTester
} from './call'
import {
  createBinaryExprTester,
  BinaryExprTester
} from './binary-expr'

export {
  BinaryExprTester,
  CallTester,
  IdentifierTester,
  VariableTester,
  ClassDetailsTester,
  NamespaceTester,
  FunctionTester,
  AccessTester
}

export const factories = {
  binaryExpr: createBinaryExprTester,
  funCall: createCallTester,
  identifier: createIdentifierTester,
  variable: createVariableTester,
  class: createClassDetailsTester,
  namespace: createNamespaceTester,
  funDecl: createFunctionTester,
  accessor: createAccessTester
}

import {
  IDetailsTester
} from './base'

export type IDetailsTesterFactory = (options: any) => IDetailsTester

export function detailsFactoryFor(name: string, $factoryMap?: any): IDetailsTesterFactory {
  $factoryMap = $factoryMap || factories
  return $factoryMap[name]
}

export function createTester(factoryName: string, node: any, options: any = {}): IDetailsTester | undefined {
  options.factories = options.factories || {}
  const testerFactory = detailsFactoryFor(factoryName, options.factories.tester)
  return testerFactory && testerFactory(options)
}

