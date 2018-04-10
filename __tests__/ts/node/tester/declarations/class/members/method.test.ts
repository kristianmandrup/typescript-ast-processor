import {
  testerFor,
  query,
  context
} from '../_imports'

const { log } = console

describe('class', () => {
  describe('method', () => {
    context('members/none file', () => {
      const tester = testerFor({
        fileName: 'members/methods',
        type: 'declarations/class',
        factoryName: 'class.method',
        traverse: (statements: any[]) => {
          // find first getter
          return statements[0].members[1]
        }
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
