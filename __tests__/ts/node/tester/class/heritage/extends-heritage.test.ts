import {
  node,
  testerFor,
  query
} from '../_imports'

const { log } = console

describe('class heritage', () => {
  describe('HeritageTester', () => {

    describe('extends', () => {
      const tester = testerFor('extends-class', {
        factory: node.tester.createClassHeritageTester,
        statementIndex: 1
      })

      describe('testExtends(query)', () => {
        it('anyOf: A - false', () => {
          const res = tester.testExtends(query.extends.anyOf)
          // log('testExtends', res)
          expect(res).toEqual(['A'])
        })
      })

      describe('test(query)', () => {
        it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
          const res = tester.test(query.heritage.onlyExtends)
          // log('test', res)
          expect(res.result).toEqual(true)
        })
      })

      describe('test(query)', () => {
        it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
          const res = tester.test(query.heritage.extendsAndImplements)
          // log('test', res)
          expect(res.result).toEqual(false)
        })
      })
    })
  })
})

