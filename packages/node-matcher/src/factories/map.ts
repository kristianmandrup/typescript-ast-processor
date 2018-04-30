import * as tester from '../exports'
const {
  type,
  initializer,
  declarations,
  statements,
  literals,
  expressions,
  invocation,
  occurrences,
  identifier,
  generic,
} = tester

const { statement, conditional, loop, error, block, expression } = statements

const { functionCall, argument, decorator } = invocation

const { classDecl, functionDecl, variables } = declarations

const funCall = functionCall
const funDecl = functionDecl

const { heritage, members } = classDecl

const { accessors } = members

export const factories = {
  // generic
  list: generic.createNodeListTester,
  nodes: generic.createNodeListTester, // alias

  // class
  'decl.class': classDecl.createClassTester,
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
  'function.arguments': argument.createArgumentNodesTester,
  'function.argument': argument.createArgumentNodesTester,

  // - decl
  'function.decl': funDecl.functionLike.createFunctionLikeNodeTester,
  'decl.function': funDecl.functionLike.createFunctionLikeNodeTester,
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
  'object.properties': literals.object.properties.createPropertyNodesTester,
  'object.propAssign':
    literals.object.properties.createPropertyAssignmentTester,

  // expressions
  'expr.binary': expressions.binary.createBinaryExpressionNodeTester,
  'expr.assignment': expressions.binary.createAssignmentNodeTester,

  // decorators
  'decorator.class': decorator.class.createClassDecoratorTester,
  'decorator.member': decorator.member.createMemberDecoratorTester,
  'decorator.param': decorator.parameter.createParameterDecoratorTester,

  occurrences: occurrences.createNodeOccurrenceTester,
  identifier: identifier.createIndentifierNodeTester,
}
