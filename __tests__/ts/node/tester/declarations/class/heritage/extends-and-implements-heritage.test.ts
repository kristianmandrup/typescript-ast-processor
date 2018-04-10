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
      context('extends-and-implements file', () => {
        const tester = testerFor({
          fileName: 'heritage/extends-and-implements',
          type: 'declarations/class',
          factoryName: 'decl.class',
          statementIndex: 3 // final class declaration that extends and implements
        })

        describe('query(query)', () => {
          it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
            const res = tester.query(query.extendsAndImplements)
            expect(res.extends).toEqual('A')
            expect(res.implements).toEqual(['Ix'])
            expect(res.result).toEqual(true)
          })
        })

        describe('test(query)', () => {
          it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
            const res = tester.test(query.extendsAndImplements)
            expect(res.extends).toEqual('A')
            expect(res.implements).toEqual(['Ix'])
            expect(res.result).toEqual(true)
          })
        })
      })
    })
  })
})
