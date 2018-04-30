import { node, context } from '../'

const { query } = node
const { createGenericQuery } = query

describe('query', () => {
  describe('createGenericQuery', () => {
    context('value: 42', () => {
      const value = [42]
      const gc = createGenericQuery({
        value,
      })

      describe('instance', () => {
        it('has value', () => {
          expect(gc.value).toBe(value)
        })
      })

      context('query: anyOf: [42, 43]', () => {
        const query = {
          anyOf: [42, 43],
        }

        describe('match', () => {
          it('matches: using instance value', () => {
            expect(gc.match(query)).toBeTruthy()
          })

          context('pass value 44', () => {
            it('does not matches', () => {
              expect(gc.match(query, 44)).toBeFalsy()
            })
          })
        })

        describe('query', () => {
          it('matches: using instance value', () => {
            expect(gc.match(query)).toBeTruthy()
          })

          context('pass value 44', () => {
            it('does not matches', () => {
              expect(gc.match(query, 44)).toBeFalsy()
            })
          })
        })
      })
    })
  })
})
