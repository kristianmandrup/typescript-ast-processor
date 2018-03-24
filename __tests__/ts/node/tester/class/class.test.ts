import {
  node,
  fixturesPath,
  fixtureFile,
  createSrcFile
} from '../'
import { Identifier, isClassDeclaration } from 'typescript';
import { ClassTester } from '../../../../../src/ts/node/tester';

describe('class', () => {
  describe('basic', () => {
    const filePath = fixtureFile('class/basic-class.ts')
    const srcFile = createSrcFile().loadSourceFile(filePath)
    const { ClassTester } = node.tester
    const { sourceFile } = srcFile
    const srcText = sourceFile.getText()
    const children = sourceFile.getChildren()
    const statements = sourceFile.statements
    const classStatement = statements[0]
    const id: Identifier = classStatement['name']

    const tester = new ClassTester(classStatement)
    // beforeEach(() => {
    //   tester =
    // })

    it('is a class', () => {
      const isClass = isClassDeclaration(classStatement)
      expect(isClass).toBeTruthy()
    })

    it('is named Abs', () => {
      const name = id.getText()
      expect(name).toEqual('Abs')
    })


    describe('info', () => {
      const info = tester.info()
      // console.log(info)
      expect(info.abstract).toBeFalsy()
    })


    describe('test', () => {
      it('is not abstract', () => {
        const result = tester.test({
          abstract: true,
          // implements: 'Ix',
          // extends: 'B'
        })
        expect(result).toBeFalsy()
      })
    })
  })


  describe('abstract', () => {
  })


  describe('extends', () => {
  })

  describe('implements', () => {
  })
})



