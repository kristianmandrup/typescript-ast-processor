import { node, context } from '../..'

const { query } = node
const { createAndQuery } = query.boolean

describe('node query', () => {
  describe('createAndQuery', () => {
    context('tester: always true', () => {
      const tester = (expr: any) => {
        return true
      }

      const boolQuery = createAndQuery({
        tester,
      })

      context('and - anyof: x, y', () => {
        const query = {
          and: [
            {
              anyOf: ['x'],
            },
            {
              anyOf: ['y'],
            },
          ],
        }

        const result = boolQuery.query(query)

        it('returns combined query result using AND', () => {
          expect(result).toBeTruthy()
        })
      })
    })
  })
})
