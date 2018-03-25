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
        factory: node.tester.createClassHeritageTester
      })

      describe('testExtends(query)', () => {
        it('anyOf: A - false', () => {
          const result = tester.testExtends(query.implements.anyOf)
          log('testExtends', result)
          expect(result).not.toEqual(false)
        })
      })

      describe('test(query)', () => {
        it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
          const result = tester.test(query.heritage)
          log('test', result)
          expect(result).not.toEqual(false)
        })
      })
    })
  })
})

