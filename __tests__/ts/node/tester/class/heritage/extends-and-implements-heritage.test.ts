import {
  node,
  testerFor,
  query
} from '../_imports'

const { log } = console

describe('class heritage', () => {
  describe('HeritageTester', () => {
    describe('extends', () => {
      const tester = testerFor('extends-and-implements', {
        factory: node.tester.createClassHeritageTester,
        statementIndex: 3
      })

      log({
        node: tester.node
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
