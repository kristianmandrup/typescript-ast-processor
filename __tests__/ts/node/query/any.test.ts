import { node, context } from '../'

const { query } = node
const { createAnyQueryMatcher } = query

describe('node query', () => {
  describe('createAnyQueryMatcher', () => {
    context('value: 42', () => {
      const qm = createAnyQueryMatcher({
        value: 42,
      })

      context('query any of: 39, 42', () => {
        const query = {
          anyOf: [39, 42],
        }

        it('matches', () => {
          const result = qm.query(query)
          expect(result).toBeTruthy()
        })
      })

      context('query any of: 39, 38', () => {
        const query = {
          anyOf: [39, 38],
        }

        it('does not match', () => {
          const result = qm.query(query)
          expect(result).toBeFalsy()
        })
      })
    })
  })
})
