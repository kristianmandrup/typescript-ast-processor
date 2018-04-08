import {
  testerFor,
  query,
  logObj,
  context
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
  context('mixed', () => {
    const tester = testerFor({
      fileName: 'mixed',
      factoryName: 'class.members',
      type: 'class',
      statementIndex: 0
    })

    describe('accessors', () => {
      it('returns list of accessors', () => {
        const accessors = tester.accessors
        expect(accessors).toEqual([])
      })
    })

    describe('getters', () => {
      it('returns list of getters', () => {
        const accessors = tester.accessors
        expect(accessors).toEqual([])
      })
    })

    describe('setters', () => {
      it('returns list of setters', () => {
        const setters = tester.setters
        expect(setters).toEqual([])
      })
    })

    describe('methods', () => {
      it('returns list of methods', () => {
        const methods = tester.methods
        expect(methods).toEqual([])
      })
    })

    describe('properties', () => {
      it('returns list of properties', () => {
        const properties = tester.properties
        expect(properties).toEqual([])
      })
    })

    describe('contstructors', () => {
      it('returns list of contstructors', () => {
        const contstructors = tester.contstructors
        expect(contstructors).toEqual([])
      })
    })

    describe('info', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info.abstract).toBeFalsy()
        expect(info.exported).toBeTruthy()
        expect(info.name).toEqual('Abs')
        expect(info.heritage.isEmpty).toBeTruthy()
      })
    })

    describe('testMembers', () => {

      it.skip('empty query - always true', () => {
        expect(tester.testMembers(query.empty)).toBeTruthy()
      })

      it.skip('invalid query - throws', () => {
        expect(() => tester.testMembers(query.invalid)).toThrow()
      })
    })
  })

})



