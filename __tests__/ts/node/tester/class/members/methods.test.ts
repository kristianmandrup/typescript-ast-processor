import {
  testerFor,
  query,
  context
} from '../_imports'

const { log } = console

describe('class', () => {
  describe('members', () => {
    describe('methods', () => {
      context('members/none file', () => {
        const tester = testerFor({
          fileName: 'method',
          type: 'method'
        })

        describe.skip('not', () => {
          describe('testMethods(query)', () => {
            it('not anyOf: A - true', () => {
              const result = tester.testMethods({
                not: query.members.methods.anyOf
              })
              expect(result).toBe(true)
            })
          })
        })
      })
    })

    context('members/methods file', () => {
      const tester = testerFor('members/methods')
      it('is a class', () => {
        expect(tester.isClass).toBeTruthy()
      })

      describe.only('testMethods(query)', () => {
        context('has getter and setter for name', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testMethods(query.members.methods.anyOf)
            log('should match', { res })
            expect(res).not.toBe(false)
            expect(res.result).toBe(true)
          })
        })

        context('has no matching methods for unknown', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testMethods(query.members.methods.noMatch)
            log('no match', { res })
            expect(res).toBe(false)
          })
        })
      })

      describe.skip('test(query)', () => {
        it('members: anyOf: Ix, Iy - false', () => {
          const res = tester.test(query.members)
          // expect(res.implements).toEqual(['Ix'])
          // expect(res.result).toBe(true)
        })
      })
    })
  })
})
