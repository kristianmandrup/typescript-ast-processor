import { node, context } from '../..'

const { query } = node
const { createRegExprMatcher } = query.matcher

describe('value query', () => {
  describe('createRegExprMatcher', () => {
    context('match: x with /x/', () => {
      const expr = /x/

      const matcher = createRegExprMatcher({
        expr,
      })
      const result = matcher.match('x')

      it('matches', () => {
        expect(result).toBeTruthy()
      })
    })

    context('match: x with /xa/', () => {
      const expr = /xa/

      const matcher = createRegExprMatcher({
        expr,
      })
      const result = matcher.match('x')

      it('no match', () => {
        expect(result).toBeFalsy()
      })
    })
  })
})
