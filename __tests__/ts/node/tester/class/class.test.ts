import {
  testerFor,
  query
} from './_imports'

const { log } = console

// 'decl.class': classes.createClassTester,
// 'class.heritage': heritage.createClassHeritageTester,

// 'class.members': members.createClassMembersTester,
// 'class.member': members.createClassMemberTester,
// 'class.property': members.createPropertyTester,
// 'class.getter': accessors.createGetAccessorTester,
// 'class.setter': accessors.createSetAccessorTester,
// 'class.constructor': members.createConstructorTester,
// 'class.method': members.createMethodTester,

describe('class', () => {
  describe('basic', () => {
    const tester = testerFor({
      fileName: 'basic-class',
      factoryName: 'decl.class',
      type: 'class'
    })
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
      it('not abstract - true', () => {
        expect(tester.testAbstract(false)).toBeTruthy()
      })

      it('abstract - false', () => {
        expect(tester.testAbstract(true)).toBeFalsy()
      })
    })

    describe('testImplements', () => {
      it('empty query - ignored and always true', () => {
        expect(tester.testImplements(query.empty)).toBeTruthy()
      })

      it.only('invalid query - throws', () => {
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
    const tester = testerFor({
      fileName: 'abstract-class',
      factoryName: 'decl.class',
      type: 'class',
    })

    it('is a class', () => {
      expect(tester.isClass).toBeTruthy()
    })

    it('is named Abs', () => {
      expect(tester.name).toBe('Abs')
    })

    it('collects correct info', () => {
      const info = tester.info()
      console.log({
        info
      })
      expect(info.abstract).toBeTruthy()
      expect(info.exported).toBeTruthy()
      expect(info.name).toBe('Abs')
      expect(info.heritage.extends).toBeUndefined()
      expect(info.heritage.implements.number).toEqual(0)
      expect(info.heritage.isEmpty).toBeTruthy()
    })
  })


  describe('extends', () => {
    const tester = testerFor({
      fileName: 'heritage/extends-class',
      factoryName: 'decl.class',
      type: 'class',
      statementIndex: 1
    })
    it('is a class', () => {
      expect(tester.isClass).toBeTruthy()
    })

    it('is named Abs', () => {
      expect(tester.name).toBe('A')
    })

    it('collects correct info', () => {
      const info = tester.info()
      expect(info.abstract).toBeFalsy()
      expect(info.exported).toBeTruthy()
      expect(info.name).toBe('A')
      expect(info.heritage.extends).toBe('B')
    })
  })

  describe('implements', () => {
    const tester = testerFor({
      fileName: 'heritage/implements-class',
      factoryName: 'decl.class',
      type: 'class',
      statementIndex: 1
    })

    it('is a class', () => {
      expect(tester.isClass).toBeTruthy()
    })

    it('is named Abs', () => {
      expect(tester.name).toBe('X')
    })

    it('collects correct info', () => {
      const info = tester.info()
      expect(info.abstract).toBeFalsy()
      expect(info.exported).toBeTruthy()
      expect(info.name).toBe('X')
      expect(info.heritage.implements.names).toEqual(['Ix'])
      expect(info.heritage.implements.number).toBe(1)
    })
  })
})



