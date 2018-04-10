import {
  testerFor,
  query,
  context
} from '../_imports'

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

        describe('test(query)', () => {
          it('extends: anyOf A and implements: anyOf: Ix, Iy - false', () => {
            const res = tester.test(query.heritage.extendsAndImplements)
            log('test', res)
            expect(res.extends).toEqual('A')
            expect(res.implements).toEqual(['Ix'])
            expect(res.result).toEqual(true)
          })
        })
      })
    })
  })
})
