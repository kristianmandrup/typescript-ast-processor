import { node, context } from '../'

const { query } = node
const { createExactQueryMatcher } = query

describe('node query', () => {
  describe('createExactQueryMatcher', () => {
    context('value: 42', () => {
      const qm = createExactQueryMatcher({
        value: 42,
      })

      context('query exactly: 42', () => {
        const query = {
          exactly: 42,
        }

        it('matches', () => {
          const result = qm.query(query)
          expect(result).toBeTruthy()
        })
      })

      context('query exactly: 39', () => {
        const query = {
          exactly: 39,
        }

        it('does not match', () => {
          const result = qm.query(query)
          expect(result).toBeFalsy()
        })
      })
    })
  })
})
