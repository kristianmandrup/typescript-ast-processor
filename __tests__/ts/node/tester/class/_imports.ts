import {
  node,
  fixtureFile,
  createSrcFile
} from '../'

export {
  node
}

export {
  query
} from './_query'

export function loadAstNode(filePath: string, statementNumber = 0): any {
  const fixturePath = fixtureFile(filePath)
  const srcFile = createSrcFile().loadSourceFile(fixturePath)

  const { sourceFile } = srcFile
  const statements = sourceFile.statements
  return statements[statementNumber]
}

export function testerFor(fileName: string, options: any = {}): any {
  const {
    factory = node.tester.createClassTester,
    statementIndex = 0
  } = options
  const filePath = `class/${fileName}.ts`
  const classStatement = loadAstNode(filePath, statementIndex)
  return factory(classStatement, {
    logging: true
  })
}
