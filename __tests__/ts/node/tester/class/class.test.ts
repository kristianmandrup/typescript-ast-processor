import {
  node,
  fixtureFile,
  createSrcFile
} from '../'
const { log } = console

function loadAstNode(filePath: string, statementNumber = 0): any {
  const fixturePath = fixtureFile(filePath)
  const srcFile = createSrcFile().loadSourceFile(fixturePath)

  const { sourceFile } = srcFile
  const statements = sourceFile.statements
  return statements[statementNumber]
}

function testerFor(fileName: string, statementNumber = 0): any {
  const { ClassTester } = node.tester
  const filePath = `class/${fileName}.ts`
  const classStatement = loadAstNode(filePath, statementNumber)
  return new ClassTester(classStatement, {
    logging: true
  })
}

describe('class', () => {
  describe('basic', () => {
    const tester = testerFor('basic-class')
    it('is a class', () => {
      expect(tester.isClass).toBeTruthy()
    })

    it('is named Abs', () => {
      expect(tester.name).toEqual('Abs')
    })


    describe('info', () => {
      it('collects correct info', () => {
        const info = tester.info()
        expect(info.abstract).toBeFalsy()
        expect(info.exported).toBeTruthy()
        expect(info.name).toEqual('Abs')
        expect(info.heritage.isEmpty).toBeTruthy()
      })
    })

    describe('test', () => {
      it('is not abstract', () => {
        expect(tester.testAbstract(false)).toBeTruthy()
      })
    })
  })


  describe('abstract', () => {
    const tester = testerFor('abstract-class')
    it('collects correct info', () => {
      const info = tester.info()
      expect(info.abstract).toBeTruthy()
      expect(info.exported).toBeTruthy()
      expect(info.name).toEqual('Abs')
      expect(info.heritage.extends).toBeUndefined()
      expect(info.heritage.implements.number).toEqual(0)
      expect(info.heritage.isEmpty).toBeTruthy()
    })
  })


  describe('extends', () => {
    const tester = testerFor('extends-class', 1)
    it('collects correct info', () => {
      const info = tester.info()
      expect(info.abstract).toBeFalsy()
      expect(info.exported).toBeTruthy()
      expect(info.name).toEqual('A')
      expect(info.heritage.extends).toBe('B')
    })
  })

  describe('implements', () => {
    const tester = testerFor('implements-class', 1)

    it('collects correct info', () => {
      const info = tester.info()
      expect(info.abstract).toBeFalsy()
      expect(info.exported).toBeTruthy()
      expect(info.name).toEqual('X')
      expect(info.heritage.implements.names).toEqual(['Ix'])
      expect(info.heritage.implements.number).toEqual(1)
    })

  })
})



