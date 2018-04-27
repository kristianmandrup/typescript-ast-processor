import { node, context } from '../..'

const { query } = node
const { createOrQuery } = query.boolean

describe('node query', () => {
  describe('createOrQuery', () => {
    context('tester: always true', () => {
      const tester = (expr: any) => {
        return expr === 'x'
      }

      const boolQuery = createOrQuery({
        tester,
      })

      context('or - anyof: x, y', () => {
        const query = {
          or: [
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

        it('is true since x matches in tester', () => {
          expect(result).toBeTruthy()
        })
      })

      context('or - anyof: z, y', () => {
        const query = {
          or: [
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

        it('is false since none matched by tester', () => {
          expect(result).toBeFalsy()
        })
      })
    })
  })
})
