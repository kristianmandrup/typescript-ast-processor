import {
  node,
  fixtureFile,
  createSrcFile
} from '../'
import { ClassTester } from '../../../../../src/ts/node/tester';
const { log } = console

function loadAstNode(filePath: string, statementNumber = 0): any {
  const fixturePath = fixtureFile(filePath)
  const srcFile = createSrcFile().loadSourceFile(fixturePath)

  const { sourceFile } = srcFile
  const statements = sourceFile.statements
  return statements[statementNumber]
}

function testerFor(fileName: string, statementNumber = 0): ClassTester {
  const { ClassTester } = node.tester
  const filePath = `class/${fileName}.ts`
  const classStatement = loadAstNode(filePath, statementNumber)
  return new ClassTester(classStatement, {
    logging: true
  })
}

describe('class', () => {
  const query = {
    empty: {},
    invalid: {
      names: 32
    },
    members: {
      valid: {
        names: ['hello']
      }
    },
    implements: {
      allOf: {
        names: {
          allOf: ['A']
        },
        count: {
          eq: 2
        }
      },
      anyOf: {
        names: {
          anyOf: ['Ix', 'Iy']
        },
        count: {
          min: 2
        }
      }
    },
    extends: {
      exactly: {
        name: 'A'
      },
      anyOf: {
        names: {
          anyOf: ['A']
        }
      }
    }
  }

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

    describe('testAbstract', () => {
      it('is not abstract', () => {
        expect(tester.testAbstract(false)).toBeTruthy()
      })

      it('is not abstract', () => {
        expect(tester.testAbstract(true)).toBeFalsy()
      })
    })

    describe('testImplements', () => {
      it('empty query - ignored and always true', () => {
        expect(tester.testImplements(query.empty)).toBeTruthy()
      })

      it('invalid query - throws', () => {
        expect(() => tester.testImplements(query.invalid)).toThrow()
      })
    })

    describe('testMembers', () => {

      it('empty query - always true', () => {
        expect(tester.testMembers(query.empty)).toBeTruthy()
      })

      it('invalid query - throws', () => {
        expect(() => tester.testMembers(query.invalid)).toThrow()
      })
    })


    describe('test', () => {
    })
  })


  describe('abstract', () => {
    const tester = testerFor('abstract-class')

    it('is a class', () => {
      expect(tester.isClass).toBeTruthy()
    })

    it('is named Abs', () => {
      expect(tester.name).toEqual('Abs')
    })

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
    it('is a class', () => {
      expect(tester.isClass).toBeTruthy()
    })

    it('is named Abs', () => {
      expect(tester.name).toEqual('A')
    })

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

    it('is a class', () => {
      expect(tester.isClass).toBeTruthy()
    })

    it('is named Abs', () => {
      expect(tester.name).toEqual('X')
    })

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



