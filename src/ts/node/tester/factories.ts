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
  decorators,
  occurrences
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
  var: variables.createVariableDeclarationTester,
  vars: variables.createVariableDeclarationsTester,

  // statements
  statements: statements.statements.createStatementsTester,
  statement: statement.createStatementTester,

  // conditional
  if: conditional.ifThenElse.createIfThenElseTester,
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
  blockStmt: block.createBlockStatementTester,

  // literals
  array: literals.createArrayLiteralTester,
  object: literals.createObjectLiteralTester,

  // expressions
  binary: expressions.binary.createBinaryExpressionNodeTester,
  assignment: expressions.binary.createAssignmentNodeTester,

  // decorators
  classDecorator: decorators.class.createClassDecoratorTester,
  memberDecorator: decorators.member.createMemberDecoratorTester,
  paramDecorator: decorators.parameter.createParameterDecoratorTester,

  occurence: occurrences.createNodeOccurrenceTester
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

