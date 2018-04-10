import {
  testerFor,
  context
} from '../_imports'
import {
  heritage as query
} from './query'


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
              const result = tester.testImplements(query.notImplements.implements)
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
          it('implements anyOf: Ix, Iy - false', () => {
            const res = tester.test(query.onlyImplements)
            expect(res).toBe(false)
          })
        })

        describe('test(query)', () => {
          it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
            const res = tester.test(query.extendsAndImplements)
            expect(res).toBe(false)
          })
        })

        describe('query(query)', () => {
          it('implements: anyOf: Ix, Iy - false', () => {
            const res = tester.query(query.onlyImplements)
            expect(res.implements).toEqual(['Ix'])
            expect(res.result).toBe(true)
          })
        })

        describe('query(query)', () => {
          it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
            const res = tester.query(query.extendsAndImplements)
            expect(res.implements).toEqual(['Ix'])
            expect(res.result).toBe(false)
          })
        })
      })
    })
  })
})

