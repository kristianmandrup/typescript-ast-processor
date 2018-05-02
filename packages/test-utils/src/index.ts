import * as path from 'path'
import context from 'jest-plugin-context'
import { node } from '@tecla5/qast-node'
import { createSrcFile } from '@tecla5/qast-core'
import { traverser } from '@tecla5/qast-traverser'
import { loggable } from '@tecla5/qast-loggable'

export { node, loggable, context, createSrcFile, traverser }

export const fixturesPath = path.join(__dirname, '../fixtures')

export function fixtureFile(filePath: string) {
  if (!/ts$/.test(filePath)) {
    filePath = filePath + '.ts'
  }
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

export { log }

export function logObj(msg: string, obj: any) {
  log(msg, JSON.stringify(obj, null, 2))
}
