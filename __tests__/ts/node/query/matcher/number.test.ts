import { node, context } from '../..'

const { query } = node
const { createNumberMatcher } = query.matcher

describe('value query', () => {
  describe('createNumberMatcher', () => {
    context('match: 42 with 42', () => {
      const expr = 42

      const matcher = createNumberMatcher({
        expr,
      })
      const result = matcher.match(42)

      it('matches', () => {
        expect(result).toBeTruthy()
      })
    })

    context('match: 43 with 42', () => {
      const expr = 43

      const matcher = createNumberMatcher({}, expr)
      const result = matcher.match(42)

      it('no match', () => {
        expect(result).toBeFalsy()
      })
    })
  })
})
