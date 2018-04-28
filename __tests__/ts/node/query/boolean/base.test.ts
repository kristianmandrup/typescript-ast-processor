import { node, context } from '../..'

const { query } = node
const { BooleanQuery } = query.boolean

describe('node query', () => {
  describe('createNotQuery', () => {
    context('tester: always true', () => {
      const tester = (expr: any) => {
        return expr === 'x'
      }

      const $query = {
        invalid: 42,
        empty: {},
        valid: {
          single: {
            and: {
              anyOf: 'x',
            },
          },
        },
      }

      const boolQuery = new BooleanQuery({
        tester,
      })

      describe('combinedLogic(query: any, tester: Function)', () => {
        context('valid query', () => {
          const query = $query.valid.single
          const result = boolQuery.combinedLogic(query, tester)

          it('makes combined logic result', () => {
            expect(result).toBeTruthy()
          })
        })
      })

      describe('singleQuery(acc: any, key: string, query: any, tester: Function)', () => {
        context('valid query', () => {
          const query = $query.valid.single
          const result = boolQuery.singleQuery({}, 'anyOf', query, tester)

          it('makes single query', () => {
            expect(result).toBeDefined()
          })
        })
      })

      describe('combined(query: any, tester: Function): any', () => {
        context('valid query', () => {
          const query = $query.valid.single

          const result = boolQuery.combined(query, tester)

          it('combines results', () => {
            expect(result).toBeDefined()
          })
        })
      })

      describe('validateQuery(query: any): boolean', () => {
        context('invalid query', () => {
          const query = $query.invalid

          const valid = boolQuery.validateQuery(query)

          it('is invalid', () => {
            expect(valid).toBeFalsy()
          })
        })

        context('valid query', () => {
          const query = $query.valid
          const valid = boolQuery.validateQuery(query)

          it('is invalid', () => {
            expect(valid).toBeFalsy()
          })
        })
      })

      describe('query(query: any, tester?: Function): any', () => {
        context('valid query', () => {
          const query = $query.valid
          const valid = boolQuery.query(query, tester)

          it('is invalid', () => {
            expect(valid).toEqual({})
          })
        })
      })
    })
  })
})
