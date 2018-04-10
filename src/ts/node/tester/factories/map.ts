import * as tester from '../exports'
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
  occurrences,
  identifier,
  generic
} = tester

const {
  statement,
  conditional,
  loop,
  error,
  block,
  expression
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


export const factories = {
  // generic
  'list': generic.createNodesTester,
  'nodes': generic.createNodesTester, // alias

  // class
  'decl.class': classes.createClassTester,
  'class.heritage': heritage.createClassHeritageTester,

  'class.members': members.createClassMembersTester,
  'class.member': members.createClassMemberTester,
  'class.property': members.createPropertyTester,
  'class.getter': accessors.createGetAccessorTester,
  'class.setter': accessors.createSetAccessorTester,
  'class.constructor': members.createConstructorTester,
  'class.method': members.createMethodTester,

  // function
  // - call
  'function.call': funCall.createFunctionCallNodeTester,
  'function.arguments': funCall.createArgumentsTester,
  'function.argument': funCall.createArgumentTester,

  // - decl
  'function.decl': funDecl.createFunctionTester,
  'function.parameters': funDecl.parameters.createParametersTester,
  'function.parameter': funDecl.parameters.createParameterTester,

  // misc
  initializer: initializer.createInitializerNodeTester,
  type: type.createTypeNodeTester,

  // variable decl
  'decl.var': variables.createVariableDeclarationTester,
  'decl.vars': variables.createVariableDeclarationsTester,

  // statements
  statements: statements.statements.createStatementsTester,
  statement: statement.createStatementTester,
  expression: expression.createExpressionStatementNodeTester,

  // conditional
  'condition.if': conditional.ifThenElse.createIfThenElseTester,
  'condition.switch': conditional.switchCase.createSwitchStatementTester,
  'condition.ternary': conditional.ternary.createTernaryNodeTester,

  'case.block': conditional.switchCase.createCaseBlockTester,
  'case.clause': conditional.switchCase.createCaseClauseTester,

  // loops
  'loop.for': loop.createForLoopTester,
  'loop.while': loop.createWhileLoopTester,

  // error
  'error.try': error.createTryCatchFinallyTester,
  'error.throw': error.createThrowTester,

  // block
  block: block.createBlockNodeTester,
  'block.stmt': block.createBlockStatementNodeTester,

  // literals
  'lit.array': literals.createArrayLiteralTester,
  'lit.object': literals.createObjectLiteralTester,
  'object.properties': literals.object.createPropertyNodesTester,
  'object.propAssign': literals.object.createPropertyAssignmentTester,


  // expressions
  'expr.binary': expressions.binary.createBinaryExpressionNodeTester,
  'expr.assignment': expressions.binary.createAssignmentNodeTester,

  // decorators
  'decorator.class': decorators.class.createClassDecoratorTester,
  'decorator.member': decorators.member.createMemberNodeDecoratorTester,
  'decorator.param': decorators.parameter.createParameterDecoratorTester,

  occurrences: occurrences.createNodeOccurrenceTester,
  identifier: identifier.createIndentifierNodeTester
}
