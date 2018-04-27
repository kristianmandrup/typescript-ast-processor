import { node, context } from '../..'

const { query } = node
const { createListMatcher } = query.matcher

describe('value query', () => {
  describe('createListMatcher', () => {
    context('match: x with /x/', () => {
      const expr = /x/

      const matcher = createListMatcher(expr, {})
      const result = matcher.match(['x', 'y'])

      it('matches', () => {
        expect(result).toBeTruthy()
      })
    })

    context('match: x with /xa/', () => {
      const expr = /xa/

      const matcher = createListMatcher(expr, {})
      const result = matcher.match(['x', 'y'])

      it('no match', () => {
        expect(result).toBeFalsy()
      })
    })
  })
})
