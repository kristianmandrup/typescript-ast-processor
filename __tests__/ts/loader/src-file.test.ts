import {
  SourceFile
} from 'typescript'
import {
  SrcFile,
  createSrcFile
} from '../../../src/ts/src-file'

// import fs from 'jest-plugin-fs'

import context from 'jest-plugin-context'

// Mock out the filesystem.
// jest.mock('fs', () => require('jest-plugin-fs/mock'));

describe('loader', () => {
  const mockedFs = {
    fxitures: {
      'hello.ts': `export function hello(name: string): string {
        return 'hi ' + name
      }`
    }
  }

  // beforeEach(() => fs.mock(mockedFs));
  // afterEach(() => fs.restore())

  const srcFile = createSrcFile({
    // fs
  })
  const fileName = 'fixtures/hello.ts'

  context('with hello.ts typescript file', () => {
    let sourceFile: SourceFile
    beforeEach(() => {
      srcFile.loadSourceFile(fileName)
    })

    it('sets sourceFile of loader', () => {
      expect(sourceFile).toBe(srcFile.sourceFile)
    })

    describe('parse', () => {
      it('can parse', () => {
        const parse = () => srcFile.parse()
        expect(parse).not.toThrow()
        expect(parse()).not.toBeDefined()
      })
    })
  })
})
