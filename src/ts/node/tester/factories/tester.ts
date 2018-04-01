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


export const factories = {
  // class
  'decl.class': classes.createClassTester,
  'class.heritage': heritage.createClassHeritageTester,

  'class.member': members.createClassMemberTester,
  'class.property': members.createPropertyTester,
  'class.getter': accessors.createGetAccessorTester,
  'class.setter': accessors.createSetAccessorTester,
  'class.constructor': members.createConstructorTester,
  'class.method': members.createMethodTester,

  // function
  // - call
  'function.call': funCall.createFunctionCallNodeTester,

  // - decl
  'function.decl': funDecl.createFunctionTester,

  // misc
  initializer: initializer.createInitializerNodeTester,
  type: type.createTypeNodeTester,

  // variable decl
  'decl.var': variables.createVariableDeclarationTester,
  'decl.vars': variables.createVariableDeclarationsTester,

  // statements
  statements: statements.statements.createStatementsTester,
  statement: statement.createStatementTester,

  // conditional
  'condition.if': conditional.ifThenElse.createIfThenElseTester,
  'condition.switch': conditional.switchCase.createSwitchStatementTester,
  'condition.ternary': conditional.ternary.createTernaryNodeTester,

  // loops
  'loop.for': loop.createForLoopTester,
  'loop.while': loop.createWhileLoopTester,

  // error
  'error.try': error.createTryCatchFinallyTester,
  'error.throw': error.createThrowTester,

  // block
  block: block.createBlockNodeTester,
  'block.stmt': block.createBlockStatementTester,

  // literals
  'lit.array': literals.createArrayLiteralTester,
  'lit.object': literals.createObjectLiteralTester,

  // expressions
  'expr.binary': expressions.binary.createBinaryExpressionNodeTester,
  'expr.assignment': expressions.binary.createAssignmentNodeTester,

  // decorators
  'decorator.class': decorators.class.createClassDecoratorTester,
  'decorator.member': decorators.member.createMemberDecoratorTester,
  'decorator.param': decorators.parameter.createParameterDecoratorTester,

  occurences: occurrences.createNodeOccurrenceTester
}
