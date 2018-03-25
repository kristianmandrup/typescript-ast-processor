import {
  node,
  testerFor,
  query
} from '../_imports'

const { log } = console

describe('class heritage', () => {
  describe('HeritageTester', () => {
    describe('basic', () => {
      const tester = testerFor('basic-class', {
        factory: node.tester.createClassHeritageTester
      })

      describe('info', () => {
        it('collect correct info', () => {
          const info = tester.info()
          expect(info).toEqual({
            implements: {
              names: [],
              number: 0
            },
            isEmpty: true
          })
        })
      })

      describe('isEmpty', () => {
        it('true', () => {
          expect(tester.isEmpty).toBe(true)
        })
      })

      describe('extends', () => {
        it('is undefined', () => {
          expect(tester.extends).toBeUndefined()
        })
      })

      describe('implements', () => {
        it('is empty', () => {
          expect(tester.implements).toEqual({
            names: [],
            number: 0
          })
        })
      })

      describe('implementNames', () => {
        it('is empty', () => {
          expect(tester.implementNames).toEqual([])
        })
      })

      describe('extendNames', () => {
        it('is empty', () => {
          expect(tester.extendNames).toEqual([])
        })
      })

      describe.skip('namesOf', () => {
      })

      describe.skip('heritage', () => {
      })

      describe.skip('clausesOf(kind)', () => {
      })

      describe.skip('extendClauses', () => {
      })

      describe.skip('implementClauses', () => {
      })

      describe.skip('createHeritageClauseTester(clause)', () => {
      })

      describe('testClauses(clauses, query)', () => {
        it('returns false when no mathces', () => {

        })

        it('returns matches when finds mathces', () => {

        })
      })

      describe('testExtends(query)', () => {
        it('anyOf: A - false', () => {
          const result = tester.testExtends(query.extends.anyOf)
          expect(result).toEqual(false)
        })
      })

      describe('testImplements(query)', () => {
        it('anyOf: Ix, Iy - false', () => {
          const result = tester.testExtends(query.implements.anyOf)
          expect(result).toEqual(false)
        })
        it('allOf: Ix - false', () => {
          const result = tester.testExtends(query.implements.allOf)
          expect(result).toEqual(false)
        })
      })

      describe('test(query)', () => {
        it('empty query = true', () => {
          const res = tester.test(query.heritage.none)
          expect(res.result).toEqual(true)
        })

        it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
          const res = tester.test(query.heritage.extendsAndImplements)
          expect(res.result).toEqual(false)
        })
      })
    })

  })
})

