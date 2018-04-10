import {
  testerFor,
  query,
  context
} from '../_imports'

const { log } = console

describe('class heritage', () => {
  describe('HeritageTester', () => {

    describe('extends', () => {
      context('basic-class file', () => {
        const tester = testerFor({
          fileName: 'basic-class',
          type: 'declarations/class',
          factoryName: 'decl.class',
          statementIndex: 0 // final class declaration that extends and implements
        })

        describe('not', () => {
          describe('testExtends(query)', () => {
            it('not anyOf: A - true', () => {
              const result = tester.testExtends(query.heritage.notExtends.extends)
              expect(result).toBe(true)
            })
          })
        })
      })

      context('implements-class file', () => {
        const tester = testerFor({
          fileName: 'heritage/extends-class',
          type: 'declarations/class',
          factoryName: 'decl.class',
          statementIndex: 1 // final class declaration that extends

        })

        describe('testExtends(query)', () => {
          it('anyOf: A - false', () => {
            const res = tester.testExtends(query.extends.anyOf)
            expect(res).toEqual('A')
          })
        })

        describe('test(query)', () => {
          it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
            const res = tester.test(query.heritage.onlyExtends)
            expect(res.extends).toEqual('A')
            expect(res.result).toEqual(true)
          })
        })

        describe('test(query)', () => {
          it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
            const res = tester.test(query.heritage.extendsAndImplements)
            expect(res.extends).toEqual('A')
            expect(res.result).toEqual(false)
          })
        })
      })
    })
  })
})
