import {
  node,
  testerFor,
  query
} from '../_imports'

const { log } = console

describe('class heritage', () => {
  describe('HeritageTester', () => {

    describe('implements', () => {
      const tester = testerFor('implements-class', {
        factory: node.tester.createClassHeritageTester,
        statementIndex: 1
      })

      describe('testExtends(query)', () => {
        it('anyOf: A - false', () => {
          const result = tester.testImplements(query.implements.anyOf)
          expect(result).not.toEqual(false)
        })
      })

      describe('test(query)', () => {
        it('implements: anyOf: Ix, Iy - false', () => {
          const res = tester.test(query.heritage.onlyImplements)
          expect(res.implements).toEqual(['Ix'])
          expect(res.result).toEqual(false)
        })
      })

      describe('test(query)', () => {
        it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
          const res = tester.test(query.heritage.extendsAndImplements)
          expect(res.implements).toEqual(['Ix'])
          expect(res.result).toEqual(false)
        })
      })
    })
  })
})

