import { node, context } from '../..'

const { query } = node
const { createRangeMatcher } = query.matcher

describe('value query', () => {
  describe('createNumberMatcher', () => {
    context('match: 42 with min: 42', () => {
      const expr = {
        min: 42,
      }

      const matcher = createRangeMatcher(expr, {})
      const result = matcher.match(42)

      it('matches', () => {
        expect(result).toBeTruthy()
      })
    })

    context('match: 43 with min: 41, max: 45', () => {
      const expr = {
        min: 41,
        max: 45,
      }

      const matcher = createRangeMatcher(expr, {})
      const result = matcher.match(42)

      it('matches', () => {
        expect(result).toBeTruthy()
      })
    })

    context('match: 42 with min: 40, max: 41', () => {
      const expr = {
        min: 40,
        max: 41,
      }

      const matcher = createRangeMatcher(expr, {})
      const result = matcher.match(42)

      it('no match', () => {
        expect(result).toBeFalsy()
      })
    })
  })
})
