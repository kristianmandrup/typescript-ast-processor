import {
  node,
  fixtureFile,
  createSrcFile
} from '../'
import context from 'jest-plugin-context'

export {
  node,
  context
}

/**
 * Load AST tree from fixtures filePath and retrieve the node to test
 * @param filePath
 * @param traverse
 * @param statementNumber
 */
export function loadAstNode(filePath: string, traverse: Function, statementNumber = 0): any {
  const fixturePath = fixtureFile(filePath)
  const srcFile = createSrcFile().loadSourceFile(fixturePath)

  const { sourceFile } = srcFile
  const statements = sourceFile.statements
  const node = traverse ? traverse(statements) : statements[statementNumber]
  // console.log('using node:', node)
  return node
}

const { log } = console

export {
  log
}

export function logObj(obj: any) {
  log(JSON.stringify(obj, null, 2))
}

const {
  tester
} = node

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

const factoryMap = {
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
  type: type.createTypeTester,

  // variable decl
  varDecl: variables.createVariableDeclarationTester,
  varDecls: variables.createVariableDeclarationsTester,

  // statements
  statements: statements.statements.createStatementsTester,
  statement: statement.createStatementTester,

  // conditional
  ifThenElse: conditional.ifThenElse.createIfThenElseTester,
  switch: conditional.switchCase.createSwitchStatementTester,
  ternary: conditional.ternary.createIfThenElseTester,

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
  classDecorator: decorators.createClassDecoratorsTester
}

function resolveStatementIndex(type: string, fileName: string): number | undefined {
  if (type === 'class') {
    if (/basic-/.test(fileName)) {
      return 0
    }
    if (/extends-/.test(fileName) || /implements-/.test(fileName)) {
      return 1
    }
    if (/-and-/.test(fileName)) {
      return 3
    }
  }
  return
}


/**
 * Create a tester for a given fileName (ie source file to load and the type of tester)
 * Options:
 *  - traverse: function to traverse to the node to test after loading AST of file
 *  - statementIndex: index of statements if AST is a simple statements list
 *  - type: name of tester factory to lookup in factoryMap
 *  - factory: custom tester factory
 * @param fileName
 * @param options
 */
export function testerFor(fileName: string, options: any = {}): any {
  let {
    factory,
    statementIndex,
    traverse,
    type = 'class'
  } = options
  factory = factory || factoryMap[type]

  statementIndex = statementIndex || resolveStatementIndex(type, fileName)

  const filePath = `${type}/${fileName}.ts`
  const classStatement = loadAstNode(filePath, traverse, statementIndex)
  return factory(classStatement, {
    logging: true
  })
}
