import * as tester from './exports'
import {
  INodeTester
} from './base'

const {
  classes,
  functions,
  type,
  initializer,
  variables,
  statements,
  literals,
  expressions,
  decorators
} = tester

const {
  statement,
  conditional,
  loop,
  error,
  block
} = statements

const funCall = functions.call
const funDecl = functions.declaration

const {
  heritage,
  members
} = classes

const {
  accessors
} = members

import { factories as detailsFactories } from '../details'

export const factoryMap = {
  details: detailsFactories,
  // class
  class: classes.createClassTester,
  heritage: heritage.createClassHeritageTester,

  member: members.createClassMemberTester,
  property: members.createPropertyTester,
  getter: accessors.createGetAccessorTester,
  setter: accessors.createSetAccessorTester,
  constructor: members.createConstructorTester,
  method: members.createMethodTester,

  // function
  // - call
  functionCall: funCall.createFunctionCallNodeTester,

  // - decl
  function: funDecl.createFunctionTester,

  // misc
  initializer: initializer.createInitializerNodeTester,
  type: type.createTypeNodeTester,

  // variable decl
  varDecl: variables.createVariableDeclarationTester,
  varDecls: variables.createVariableDeclarationsTester,

  // statements
  statements: statements.statements.createStatementsTester,
  statement: statement.createStatementTester,

  // conditional
  ifThenElse: conditional.ifThenElse.createIfThenElseTester,
  switch: conditional.switchCase.createSwitchStatementTester,
  ternary: conditional.ternary.createTernaryNodeTester,

  // loops
  forLoop: loop.createForLoopTester,
  while: loop.createWhileLoopTester,

  // error
  tryCatch: error.createTryCatchFinallyTester,
  throw: error.createThrowTester,

  // block
  block: block.createBlockNodeTester,
  blockStatement: block.createBlockStatementTester,

  // literals
  arrayLit: literals.createArrayLiteralTester,
  objectLit: literals.createObjectLiteralTester,

  // expressions
  binaryExpr: expressions.binaryExpr.createBinaryExpressionTester,
  assignment: expressions.binaryExpr.createAssignmentTester,

  // decorators
  classDecorator: decorators.class.ClassDecoratorTester
}

export type INodeTesterFactory = (node: any, options: any) => INodeTester

export function testerFactoryFor(name: string, $factoryMap?: any): INodeTesterFactory {
  $factoryMap = $factoryMap || factoryMap
  return $factoryMap[name]
}

export function detailsFactoryFor(name: string, $factoryMap?: any): INodeTesterFactory {
  $factoryMap = $factoryMap || factoryMap.details
  return $factoryMap[name]
}

export function createTester(factoryName: string, node: any, options: any = {}): INodeTester | undefined {
  options.factories = options.factories || {}
  const testerFactory = testerFactoryFor(factoryName, options.factories.tester)
  return testerFactory && testerFactory(node, options)
}

