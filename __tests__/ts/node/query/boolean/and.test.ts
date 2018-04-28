import { node, context } from '../..'

const { query } = node
const { createAndQuery } = query.boolean

describe('node query', () => {
  describe('createAndQuery', () => {
    context('tester: always true', () => {
      const tester = (expr: any) => {
        return true
      }

      context('query: empty', () => {
        const boolQuery = createAndQuery({
          tester,
        })

        const query = {}

        describe('test', () => {
          const doQuery = () => boolQuery.test(query)

          it('throws', () => {
            expect(doQuery).toThrow()
          })
        })

        context('and: undefined', () => {
          const boolQuery = createAndQuery({
            tester,
          })

          const query = {
            and: undefined,
          }

          describe('match', () => {
            const doQuery = () => boolQuery.query(query)

            it('throws', () => {
              expect(doQuery).toThrow()
            })
          })
        })

        context('and: empty object', () => {
          const boolQuery = createAndQuery({
            tester,
          })

          const query = {
            and: {},
          }

          describe('match', () => {
            const doQuery = () => boolQuery.match(query)

            it('throws', () => {
              expect(doQuery).toThrow()
            })
          })
        })

        context('and: invalid (42)', () => {
          const boolQuery = createAndQuery({
            tester,
          })

          const query = {
            and: 42,
          }

          describe('match', () => {
            const doQuery = () => boolQuery.match(query)

            it('throws', () => {
              expect(doQuery).toThrow()
            })
          })
        })

        context('and: object: single anyOf', () => {
          const boolQuery = createAndQuery({
            tester,
          })

          const query = {
            and: {
              anyOf: 'x',
            },
          }

          describe('match', () => {
            const doQuery = () => boolQuery.match(query)

            it('does not throws', () => {
              expect(doQuery).not.toThrow()
            })

            it('is true', () => {
              expect(doQuery()).toBeTruthy()
            })
          })
        })

        context('and: object: anyOf and allOf', () => {
          const boolQuery = createAndQuery({
            tester,
          })

          const query = {
            and: {
              anyOf: 'x',
              allOf: 'y',
            },
          }

          describe('match', () => {
            const doQuery = () => boolQuery.match(query)

            it('does not throws', () => {
              expect(doQuery).not.toThrow()
            })

            it('is true', () => {
              expect(doQuery()).toBeTruthy()
            })
          })
        })

        context('and: object: single anyOf in list', () => {
          const boolQuery = createAndQuery({
            tester,
          })

          const query = {
            and: [
              {
                anyOf: 'x',
              },
            ],
          }

          describe('match', () => {
            const doQuery = () => boolQuery.match(query)

            it('does not throws', () => {
              expect(doQuery).not.toThrow()
            })

            it('is true', () => {
              expect(doQuery()).toBeTruthy()
            })
          })
        })

        context('and: list with two anyof objects: x, y', () => {
          const boolQuery = createAndQuery({
            tester,
          })

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

          describe('match', () => {
            const result = boolQuery.match(query)

            it('returns combined query result using AND', () => {
              expect(result).toBeTruthy()
            })
          })

          describe('query', () => {
            const result = boolQuery.query(query)

            it('returns combined query result using AND', () => {
              // what to expect: {and: true} ??
              expect(result).toEqual({ anyOf: true })
            })
          })
        })
      })
    })
  })
})
