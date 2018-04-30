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
              const result = tester.testExtends(query.notExtends.extends)
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
            const res = tester.test(query.onlyExtends)
            expect(res.extends).toEqual('A')
            expect(res.result).toEqual(true)
          })
        })

        describe('test(query)', () => {
          it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
            const res = tester.test(query.extendsAndImplements)
            expect(res.extends).toEqual('A')
            expect(res.result).toEqual(false)
          })
        })
      })
    })
  })
})
