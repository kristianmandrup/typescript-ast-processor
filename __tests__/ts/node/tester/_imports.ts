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

export function loadAstNode(filePath: string, traverse: Function, statementNumber = 0): any {
  const fixturePath = fixtureFile(filePath)
  const srcFile = createSrcFile().loadSourceFile(fixturePath)

  const { sourceFile } = srcFile
  const statements = sourceFile.statements
  const node = traverse ? traverse(statements) : statements[statementNumber]
  // console.log('using node:', node)
  return node
}

const factoryMap = {
  class: node.tester.createClassTester,
  function: node.tester.createFunctionTester
}

export function testerFor(fileName: string, options: any = {}): any {
  let {
    factory,
    statementIndex = 0,
    traverse,
    type = 'class'
  } = options
  factory = factory || factoryMap[type]

  if (type === 'class') {
    if (/basic-/.test(fileName)) {
      statementIndex = 0
    }
    if (/extends-/.test(fileName) || /implements-/.test(fileName)) {
      statementIndex = 1
    }
    if (/-and-/.test(fileName)) {
      statementIndex = 3
    }
  }

  const filePath = `${type}/${fileName}.ts`
  const classStatement = loadAstNode(filePath, traverse, statementIndex)
  return factory(classStatement, {
    logging: true
  })
}
