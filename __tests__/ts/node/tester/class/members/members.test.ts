import {
  testerFor,
  query,
  context,
  node
} from '../_imports'

const { log } = console

describe('class', () => {
  describe('members', () => {
    describe('all', () => {
      context('members/none file', () => {
        const tester = testerFor('members/none', {
          factory: node.tester.createClassMembersTester,
          traverse: (statements: any[]) => {
            // find first getter
            return statements[0].members[1]
          }
        })

        describe.skip('not', () => {
          describe('testAccessors(query)', () => {
            it('not anyOf: A - true', () => {
              const result = tester.test(query.members.onlyAccessors.anyOf)
              expect(result).toBe(true)
            })
          })
        })
      })
    })

    context('members/accessors file', () => {
      const tester = testerFor('members/accessors')
      it('is a class', () => {
        expect(tester.isClass).toBeTruthy()
      })

      describe.only('test(query)', () => {
        context('has getter and setter for name', () => {
          it('anyOf: name - true ', () => {
            const res = tester.test(query.members.onlyAccessors.anyOf)
            log('should match', { res })
            expect(res).not.toBe(false)
            expect(res.result).toBe(true)
          })
        })

        context('has no matching members for unknown', () => {
          it('anyOf: name - true ', () => {
            const res = tester.test(query.members.onlyAccessors.noMatch)
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
