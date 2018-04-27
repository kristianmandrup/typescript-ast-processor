import { node, context } from '../..'
import {
  IMatcherSelector,
  IValueMatcher,
} from '../../../../../src/ts/node/query/matcher'

const { query } = node
const { createMatcherSelector } = query.matcher

describe('value query', () => {
  describe('MatcherSelector', () => {
    context('string: x', () => {
      const selector: IMatcherSelector = createMatcherSelector({})
      const matcher: IValueMatcher = selector.select('x')

      it('selects StringMatcher', () => {
        expect(matcher.caption).toBe('StringMatcher')
      })
    })

    context('number: 42', () => {
      const selector: IMatcherSelector = createMatcherSelector({})
      const matcher: IValueMatcher = selector.select(42)

      it('selects NumberMatcher', () => {
        expect(matcher.caption).toBe('NumberMatcher')
      })
    })

    context('regexp: /x/', () => {
      const selector: IMatcherSelector = createMatcherSelector({})
      const matcher: IValueMatcher = selector.select(/x/)

      it('selects RegExpMatcher', () => {
        expect(matcher.caption).toBe('RegExpMatcher')
      })
    })

    context('range: min:42', () => {
      const selector: IMatcherSelector = createMatcherSelector({})
      const matcher: IValueMatcher = selector.select({
        min: 42,
      })

      it('selects RangeMatcher', () => {
        expect(matcher.caption).toBe('RangeMatcher')
      })
    })

    context('list: [42]', () => {
      const selector: IMatcherSelector = createMatcherSelector({})
      const matcher: IValueMatcher = selector.select([42])

      it('selects ListMatcher', () => {
        expect(matcher.caption).toBe('ListMatcher')
      })
    })
  })
})
