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



export {
  query
} from './_query'

export function loadAstNode(filePath: string, traverse: Function, statementNumber = 0): any {
  const fixturePath = fixtureFile(filePath)
  const srcFile = createSrcFile().loadSourceFile(fixturePath)

  const { sourceFile } = srcFile
  const statements = sourceFile.statements
  return traverse ? traverse(statements) : statements[statementNumber]
}

export function testerFor(fileName: string, options: any = {}): any {
  let {
    factory = node.tester.createClassTester,
    statementIndex = 0,
    traverse
  } = options
  if (/basic-/.test(fileName)) {
    statementIndex = 0
  }
  if (/extends-/.test(fileName) || /implements-/.test(fileName)) {
    statementIndex = 1
  }
  if (/-and-/.test(fileName)) {
    statementIndex = 3
  }

  const filePath = `class/${fileName}.ts`
  const classStatement = loadAstNode(filePath, traverse, statementIndex)
  return factory(classStatement, {
    logging: true
  })
}
