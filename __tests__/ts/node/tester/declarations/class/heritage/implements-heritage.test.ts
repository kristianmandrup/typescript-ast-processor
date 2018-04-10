import {
  testerFor,
  query,
  context
} from '../_imports'

const { log } = console

describe('class heritage', () => {
  describe('HeritageTester', () => {

    describe('implements', () => {
      context('basic-class file', () => {
        const tester = testerFor({
          fileName: 'basic-class',
          type: 'declarations/class',
          factoryName: 'decl.class',
          statementIndex: 0 // final class declaration that extends and implements
        })

        describe('not', () => {
          describe('testImplements(query)', () => {
            it('not anyOf: A - true', () => {
              const result = tester.testImplements(query.heritage.notImplements.implements)
              expect(result).toBe(true)
            })
          })
        })
      })

      context('implements-class file', () => {
        const tester = testerFor({
          fileName: 'heritage/implements-class',
          type: 'declarations/class',
          factoryName: 'decl.class',
          statementIndex: 0 // final class declaration that extends and implements
        })

        describe('testImplements(query)', () => {
          it('anyOf: A - false', () => {
            const result = tester.testImplements(query.implements.anyOf)
            expect(result).not.toBe(false)
          })
        })

        describe('test(query)', () => {
          it('implements: anyOf: Ix, Iy - false', () => {
            const res = tester.test(query.heritage.onlyImplements)
            expect(res.implements).toEqual(['Ix'])
            expect(res.result).toBe(true)
          })
        })

        describe('test(query)', () => {
          it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
            const res = tester.test(query.heritage.extendsAndImplements)
            expect(res.implements).toEqual(['Ix'])
            expect(res.result).toBe(false)
          })
        })
      })
    })
  })
})

