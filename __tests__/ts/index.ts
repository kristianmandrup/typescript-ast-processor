import * as path from 'path'
import context from 'jest-plugin-context'
import {
  node,
  createSrcFile,
  traverser
} from '../../src/ts'

export {
  node,
  context,
  createSrcFile,
  traverser
}

export const fixturesPath = path.join(__dirname, '../fixtures')

export function fixtureFile(filePath: string) {
  return path.resolve(path.join(fixturesPath, filePath))
}

/**
 * Load AST tree from fixtures filePath and retrieve the node to test
 * @param filePath
 * @param traverse
 * @param statementNumber
 */
export function loadAstNode(filePath: string, traverse?: Function): any {
  const fixturePath = fixtureFile(filePath)
  return createSrcFile().loadSourceFile(fixturePath).sourceFile
}

const { log } = console

export {
  log
}

export function logObj(msg: string, obj: any) {
  log(msg, JSON.stringify(obj, null, 2))
}
