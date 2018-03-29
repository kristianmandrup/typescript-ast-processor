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

export const factoryMap = {
  binaryExpr: createBinaryExprTester,
  funCall: createCallTester,
  identifier: createIdentifierTester,
  variable: createVariableTester,
  class: createClassDetailsTester,
  namespace: createNamespaceTester,
  funDecl: createFunctionTester,
  accessor: createAccessTester
}
