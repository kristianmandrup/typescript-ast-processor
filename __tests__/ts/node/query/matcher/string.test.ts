import { node, context } from '../..'

const { query } = node
const { createStringMatcher } = query.matcher

describe('value query', () => {
  describe('createNumberMatcher', () => {
    context('match: x with x', () => {
      const expr = 'x'

      const matcher = createStringMatcher({
        expr,
      })
      const result = matcher.match('x')

      it('matches', () => {
        expect(result).toBeTruthy()
      })
    })

    context('match: x with xa', () => {
      const expr = 'xa'

      const matcher = createStringMatcher({
        expr,
      })
      const result = matcher.match('x')

      it('no match', () => {
        expect(result).toBeFalsy()
      })
    })
  })
})
