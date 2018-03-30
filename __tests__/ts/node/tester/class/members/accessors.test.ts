import {
  testerFor,
  query,
  context,
  node
} from '../_imports'

const { log } = console

describe('class', () => {
  describe('members', () => {
    describe('accessors', () => {
      context('none file - no accessors', () => {
        const tester = testerFor({
          fileName: 'none',
          type: 'accessor',
          traverse: (statements: any[]) => {
            // find first getter
            return statements[0].members //[1]
          }
        })

        describe.skip('not', () => {
          describe('testAccessors(query)', () => {
            it('not anyOf: A - true', () => {
              const result = tester.testAccessors(query.members.onlyAccessors.anyOf)
              expect(result).toBe(true)
            })
          })
        })
      })
    })

    context('members/accessors/pair file with pair', () => {
      const tester = testerFor({
        fileName: 'pair',
        type: 'accessor',
      })

      it('is a class', () => {
        expect(tester.isClass).toBeTruthy()
      })

      describe.only('testAccessors(query)', () => {
        context('has getter and setter for name', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testAccessors(query.members.onlyAccessors.anyOf)
            log('should match', { res })
            expect(res).not.toBe(false)
            expect(res.result).toBe(true)
          })
        })

        context('has no matching accessors for unknown', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testAccessors(query.members.onlyAccessors.noMatch)
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
