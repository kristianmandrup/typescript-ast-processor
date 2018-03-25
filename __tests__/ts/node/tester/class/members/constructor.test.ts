import {
  testerFor,
  query,
  context,
  node
} from '../_imports'

const { log } = console

describe('class', () => {
  describe('members', () => {
    describe('constructor', () => {
      context('members/static file', () => {
        const tester = testerFor('members/constructor', {
          factory: node.tester.createClassMembersTester,
          traverse: (statements: any[]) => {
            // find constructor
            return statements[0].members[1]
          }
        })

        describe.skip('not', () => {
          describe('testConstructor(query)', () => {
            it('not anyOf: name - true', () => {
              const result = tester.testConstructor(query.members.constructor.anyOf)
              expect(result).toBe(true)
            })
          })
        })
      })
    })
  })
})

