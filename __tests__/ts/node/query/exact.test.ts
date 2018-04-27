import { node, context } from '../'

const { query } = node
const { createExactQueryMatcher } = query

describe('node query', () => {
  describe('createExactQueryMatcher', () => {
    context('value: 42', () => {
      const qm = createExactQueryMatcher({
        value: 42,
      })
      const query = {
        exactly: 42,
      }

      context('match: exactly: 42', () => {
        describe('match', () => {
          it('matches', () => {
            const result = qm.match(query)
            expect(result).toBeTruthy()
          })
        })
      })

      context('match: exactly: 39', () => {
        const query = {
          exactly: 39,
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
