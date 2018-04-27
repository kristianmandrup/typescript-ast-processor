import { node, context } from '../'

const { query } = node
const { createAnyQueryMatcher } = query

describe('node query', () => {
  describe('createAnyQueryMatcher', () => {
    context('value: 42', () => {
      const qm = createAnyQueryMatcher({
        value: 42,
      })

      context('query: anyOf: [39, 42]', () => {
        const query = {
          anyOf: [39, 42],
        }

        describe('match', () => {
          it('matches', () => {
            const result = qm.match(query)
            expect(result).toBeTruthy()
          })
        })

        describe('match with value: 45', () => {
          it('does not match', () => {
            const result = qm.match(query, 45)
            expect(result).toBeFalsy()
          })
        })
      })

      context('query anyOf: [39, 38]', () => {
        const query = {
          anyOf: [39, 38],
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
