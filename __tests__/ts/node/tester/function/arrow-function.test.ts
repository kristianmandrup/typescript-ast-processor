import {
  testerFor,
  context,
  node,
  query
} from './_imports'
import { FunctionLikeNodeTester } from '../../../../../src/ts/node/tester/function';

const { log } = console

describe('function', () => {
  describe('arrow', () => {
    context('arrow-function file', () => {
      const tester: FunctionLikeNodeTester = testerFor('arrow-var-function', {
        type: 'function'
      })

      describe.skip('not', () => {
        describe('testMethods(query)', () => {
          it('not anyOf: A - true', () => {
            const result = tester.testParameters({
              not: query.parameters
            })
            expect(result).toBe(true)
          })
        })
      })

      describe('testParameters(query)', () => {
        context('has matching parameter name', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testParameters(query.parameters)
            log('should match', { res })
            expect(res).not.toBe(false)
            // expect(res.result).toBe(true)
          })
        })

        context('has no matching parameters for unknown', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testParameters(query.parameters)
            log('no match', { res })
            expect(res).toBe(false)
          })
        })
      })

      describe.skip('test(query)', () => {
        it('members: anyOf: Ix, Iy - false', () => {
          const res = tester.test(query.parameters)
          // expect(res.implements).toEqual(['Ix'])
          // expect(res.result).toBe(true)
        })
      })
    })
  })
})
