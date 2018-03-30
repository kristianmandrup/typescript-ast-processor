import {
  testerFor,
  query,
  context,
  node
} from '../_imports'

const { log } = console

describe('class', () => {
  describe('members', () => {
    describe('static', () => {
      context('members/static file', () => {
        const tester = testerFor({
          fileName: 'static',
          type: 'static',
          traverse: (statements: any[]) => {
            // find first static
            return statements[0].members[1]
          }
        })

        describe.skip('not', () => {
          describe('testStatics(query)', () => {
            it('not anyOf: A - true', () => {
              const result = tester.testStatics(query.members.statics.anyOf)
              expect(result).toBe(true)
            })
          })
        })
      })
    })
  })
})

