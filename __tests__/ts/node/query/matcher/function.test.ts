import { node, context } from '../..'

const { query } = node
const { createFunctionMatcher } = query.matcher

describe('value query', () => {
  describe('createFunctionMatcher', () => {
    context('match function: always true', () => {
      const expr = {
        matches() {
          return true
        },
      }

      const matcher = createFunctionMatcher(expr, {})
      const result = matcher.match(1)

      it('matches', () => {
        expect(result).toBeTruthy()
      })
    })

    context('match function: return undefined', () => {
      const expr = () => {
        return undefined
      }

      const matcher = createFunctionMatcher(expr, {})
      const result = matcher.match(1)

      it('no match', () => {
        expect(result).toBeFalsy()
      })
    })
  })
})
