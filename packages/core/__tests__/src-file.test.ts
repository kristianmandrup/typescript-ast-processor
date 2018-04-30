import {
  SourceFile, ScriptTarget
} from 'typescript'
import {
  SrcFile,
  createSrcFile
} from '../../../src/ts/src-file'

import {
  compilerOpts
} from '../../../src/ts/opts/compiler'

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

  context('initial srcFile', () => {
    it('is a SrcFile instance', () => {
      expect(srcFile instanceof SrcFile).toBeTruthy()
    })

    describe('sourceFile', () => {
      it('is not set', () => {
        expect(srcFile.sourceFile).not.toBeDefined()
      })
    })

    describe('compilerOpts', () => {
      it('to be set', () => {
        expect(srcFile.compilerOpts).toEqual(compilerOpts)
      })
    })

    describe('fileNames', () => {
      it('to be empty', () => {
        expect(srcFile.fileNames).toEqual([])
      })
    })

    describe('tsFileNames', () => {
      it('to be empty', () => {
        expect(srcFile.tsFileNames).toEqual([])
      })
    })

    describe('fileName', () => {
      it('is not set', () => {
        expect(srcFile.fileName).not.toBeDefined()
      })
    })

    describe('fileName', () => {
      it('is not set', () => {
        expect(srcFile.fileName).not.toBeDefined()
      })
    })

    describe('languageVersion', () => {
      it('is not set', () => {
        expect(srcFile.languageVersion).toBe(ScriptTarget.Latest)
      })
    })
  })

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
