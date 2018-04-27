import { node, context } from '../..'

const { query } = node
const { createNotQuery } = query.boolean

describe('node query', () => {
  describe('createNotQuery', () => {
    context('tester: always true', () => {
      const tester = (expr: any) => {
        return expr === 'x'
      }

      const boolQuery = createNotQuery({
        tester,
      })

      context('not - anyof: x, y', () => {
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

        const result = boolQuery.query(query)

        it('is false since x matches in tester', () => {
          expect(result).toBeFalsy()
        })
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

        const result = boolQuery.query(query)

        it('is true since none matched by tester', () => {
          expect(result).toBeTruthy()
        })
      })
    })
  })
})
