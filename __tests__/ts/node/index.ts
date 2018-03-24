import * as path from 'path'

export {
  node,
  createSrcFile
} from '../../../src/ts'

export const fixturesPath = path.join(__dirname, '../../fixtures')

export function fixtureFile(filePath: string) {
  return path.resolve(path.join(fixturesPath, filePath))
}
