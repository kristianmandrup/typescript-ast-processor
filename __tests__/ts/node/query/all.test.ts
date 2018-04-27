import { node, context } from '../'

const { query } = node
const { createAllQueryMatcher } = query

describe('node query', () => {
  describe('createAllQueryMatcher', () => {
    context('value: 42', () => {
      const qm = createAllQueryMatcher({
        value: 42,
      })

      context('match: allOf: [42, 42]', () => {
        const query = {
          allOf: [42, 42],
        }

        describe('match', () => {
          it('matches', () => {
            const result = qm.match(query)
            expect(result).toBeTruthy()
          })
        })
      })

      context('match: all of: 39, 42', () => {
        const query = {
          allOf: [39, 42],
        }
        describe('match', () => {
          it('does not match', () => {
            const result = qm.match(query)
            expect(result).toBeFalsy()
          })
        })
      })
    })
  })
})
