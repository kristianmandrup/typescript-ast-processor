import {
  ScriptTarget
} from 'typescript'
import {
  createLoader
} from '../../../src/ts/loader'
import {
  compilerOpts
} from '../../../src/ts/opts/compiler'
import context from 'jest-plugin-context'

// Mock out the filesystem.
jest.mock('fs', () => require('jest-plugin-fs/mock'));

describe('loader', () => {
  const loader = createLoader()

  context('with created loader', () => {
    describe('program', () => {
      it('is not set', () => {
        expect(loader.program).not.toBeDefined()
      })

      describe('sourceFile', () => {
        it('is not set', () => {
          expect(loader.sourceFile).not.toBeDefined()
        })
      })

      describe('compilerOpts', () => {
        it('to be set', () => {
          expect(loader.compilerOpts).toEqual(compilerOpts)
        })
      })

      describe('fileNames', () => {
        it('to be empty', () => {
          expect(loader.fileNames).toEqual([])
        })
      })

      describe('tsFileNames', () => {
        it('to be empty', () => {
          expect(loader.tsFileNames).toEqual([])
        })
      })

      describe('fileName', () => {
        it('is not set', () => {
          expect(loader.fileName).not.toBeDefined()
        })
      })

      describe('fileName', () => {
        it('is not set', () => {
          expect(loader.fileName).not.toBeDefined()
        })
      })

      describe('languageVersion', () => {
        it('is not set', () => {
          expect(loader.languageVersion).toBe(ScriptTarget.Latest)
        })
      })
    })
  })
})
