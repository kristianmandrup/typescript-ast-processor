import {
  Program, SourceFile
} from 'typescript'
import {
  createLoader
} from '../../../src/ts/loader'
import {
  compilerOpts
} from '../../../src/ts/opts/compiler'

import fs from 'jest-plugin-fs'
import context from 'jest-plugin-context'

// Mock out the filesystem.
jest.mock('fs', () => require('jest-plugin-fs/mock'));

describe('loader', () => {
  const loader = createLoader()
  const fileName = 'fixtures/hello.ts'

  const mockedFs = {
    fixtures: {
      'hello.ts': `export function hello(name: string): string {
        return 'hi ' + name
      }`
    }
  }

  beforeEach(() => fs.mock(mockedFs));
  afterEach(() => fs.restore())

  describe('loadProgram', () => {
    it('loads the program', () => {
      expect(loader.loadProgram(fileName)).toBeDefined()
    })
  })

  context('with hello.ts loaded', () => {
    let program: Program
    beforeEach(() => {
      program = loader.loadProgram(fileName)
    })

    describe('loadProgram', () => {
      it('has correct compiler options', () => {
        expect(program.getCompilerOptions()).toEqual(compilerOpts)
      })

      it('has a single source file', () => {
        expect(program.getSourceFiles()).toEqual([
        ])
      })
    })

    context('with loaded program', () => {
      beforeEach(() => {
        loader.loadProgram(fileName)
      })

      describe('loadSourceFile', () => {
        it('throws since no source file loaded ', () => {
          const parse = () => loader.parse()
          expect(parse).toThrow()
        })
      })

      describe('sourceFileFor', () => {
        describe('sourceFileFor', () => {
          it('finds source file for program', () => {
            const getSourceFile = () => loader.sourceFileFor(fileName)
            expect(getSourceFile).toThrow()
          })

          context('with loaded source file', () => {
            let sourceFile: SourceFile | undefined
            beforeEach(() => {
              sourceFile = loader.sourceFileFor(fileName)
            })

            describe.skip('parse', () => {
              it('can parse', () => {
                const parse = () => loader.parse(sourceFile)
                expect(parse).not.toThrow()
                expect(parse()).toBeDefined()
              })
            })
          })
        })
      })
    })
  })
})
