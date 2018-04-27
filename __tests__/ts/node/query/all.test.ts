import { node, context } from '../'

const { query } = node
const { createAnyQueryMatcher } = query

describe('node query', () => {
  describe('createAnyQueryMatcher', () => {
    context('value: 42', () => {
      const qm = createAnyQueryMatcher({
        value: 42,
      })

      context('query all of: 42, 42', () => {
        const query = {
          allOf: [42, 42],
        }

        it('matches', () => {
          const result = qm.query(query)
          expect(result).toBeTruthy()
        })
      })

      context('query all of: 39, 42', () => {
        const query = {
          allOf: [39, 42],
        }

        it('does not match', () => {
          const result = qm.query(query)
          expect(result).toBeFalsy()
        })
      })
    })
  })
})
