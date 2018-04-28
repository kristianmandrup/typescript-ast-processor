import { node, context } from '../..'

const { query } = node
const { BooleanQuery } = query.boolean
const { log } = console

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

      describe('combinedLogic(query: any, tester: Function)', () => {
        const boolQuery = new BooleanQuery({
          tester,
        })

        context('valid query', () => {
          const query = $query.valid.single
          const result = boolQuery.combinedLogic(query, tester)
          log({
            result,
          })

          it('combined logic is false since no results', () => {
            expect(result).toBeFalsy()
          })
        })
      })

      describe('singleQuery(acc: any, key: string, query: any, tester: Function)', () => {
        const boolQuery = new BooleanQuery({
          tester,
        })

        context('valid query', () => {
          const query = $query.valid.single
          const result = boolQuery.singleQuery({}, 'anyOf', query, tester)

          it('makes single query', () => {
            expect(result).toBeDefined()
          })
        })
      })

      describe('combined(query: any, tester: Function): any', () => {
        const boolQuery = new BooleanQuery({
          tester,
        })

        context('valid query', () => {
          const query = $query.valid.single

          const result = boolQuery.combinedQuery(query, tester)

          it('combines results', () => {
            expect(result).toBeDefined()
          })
        })
      })

      describe('validateQuery(query: any): boolean', () => {
        const boolQuery = new BooleanQuery({
          tester,
        })

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

          it('is valid', () => {
            expect(valid).toBeTruthy()
          })
        })
      })

      describe('query(query: any, tester?: Function): any', () => {
        const boolQuery = new BooleanQuery({
          tester,
        })

        context('valid query', () => {
          const query = $query.valid
          const valid = boolQuery.query(query, tester)

          it('is an object', () => {
            expect(valid).toEqual({})
          })
        })
      })
    })
  })
})
