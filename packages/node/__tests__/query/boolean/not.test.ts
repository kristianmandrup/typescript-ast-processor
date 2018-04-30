import { node, context } from '../..'

const { query } = node
const { createNotQuery } = query.boolean

describe('node query', () => {
  describe('createNotQuery', () => {
    context('tester: always true', () => {
      context('not - anyof: x, y', () => {
        const tester = (expr: any) => {
          return true
        }
        const boolQuery = createNotQuery({
          tester,
        })

        const query = {
          not: [
            {
              anyOf: ['x'],
            },
            // alternative query expression
            {
              name: 'anyOf',
              matchers: ['y'],
            },
          ],
        }
        describe('match', () => {
          const result = boolQuery.match(query)

          it('is false since x matches in tester', () => {
            expect(result).toBeFalsy()
          })
        })
      })
    })

    context('tester: always false', () => {
      const tester = (expr: any) => {
        return false
      }

      const boolQuery = createNotQuery({
        tester,
      })

      context('not - anyof: z, y', () => {
        const query = {
          not: [
            {
              anyOf: ['z'],
            },
            {
              name: 'anyOf',
              matchers: ['y'],
            },
          ],
        }

        describe('match', () => {
          const result = boolQuery.match(query)

          it('is true since none matched by tester', () => {
            expect(result).toBeTruthy()
          })
        })
      })
    })
  })
})
