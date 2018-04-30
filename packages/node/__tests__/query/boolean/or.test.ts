import { node, context } from '../..'

const { query } = node
const { createOrQuery } = query.boolean

describe('node query', () => {
  describe('createOrQuery', () => {
    context('tester: always true', () => {
      const tester = (expr: any) => {
        return true
      }

      context('query: empty', () => {
        const boolQuery = createOrQuery({
          tester,
        })

        const query = {}

        describe('test', () => {
          const doQuery = () => boolQuery.test(query)

          it('throws', () => {
            expect(doQuery).toThrow()
          })
        })

        context('or: undefined', () => {
          const boolQuery = createOrQuery({
            tester,
          })

          const query = {
            or: undefined,
          }

          describe('match', () => {
            const doQuery = () => boolQuery.query(query)

            it('throws', () => {
              expect(doQuery).toThrow()
            })
          })
        })

        context('or: empty object', () => {
          const boolQuery = createOrQuery({
            tester,
          })

          const query = {
            or: {},
          }

          describe('match', () => {
            const doQuery = () => boolQuery.match(query)

            it('throws', () => {
              expect(doQuery).toThrow()
            })
          })
        })

        context('or: invalid (42)', () => {
          const boolQuery = createOrQuery({
            tester,
          })

          const query = {
            or: 42,
          }

          describe('match', () => {
            const doQuery = () => boolQuery.match(query)

            it('throws', () => {
              expect(doQuery).toThrow()
            })
          })
        })

        context('or: object: single anyOf', () => {
          const boolQuery = createOrQuery({
            tester,
          })

          const query = {
            or: {
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

        context('or: object: anyOf and allOf', () => {
          const boolQuery = createOrQuery({
            tester,
          })

          const query = {
            or: {
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

        context('or: object: single anyOf in list', () => {
          const boolQuery = createOrQuery({
            tester,
          })

          const query = {
            or: [
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

        context('or: list with two anyof objects: x, y', () => {
          const boolQuery = createOrQuery({
            tester,
          })

          const query = {
            or: [
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
              // what to expect: {or: true} ??
              expect(result).toEqual({ anyOf: true })
            })
          })
        })
      })
    })
  })
})
