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

      context('query: empty', () => {
        const query = {}
      })

      context('and: undefined', () => {
        const query = {
          and: undefined,
        }

        describe('match', () => {
          const doQuery = () => boolQuery.query(query)

          it('does not throws', () => {
            expect(doQuery).not.toThrow()
          })

          it('is false', () => {
            expect(doQuery()).toBeFalsy()
          })
        })
      })

      context('and: empty object', () => {
        const query = {
          and: {},
        }

        describe('match', () => {
          const doQuery = () => boolQuery.query(query)

          it('does not throws', () => {
            expect(doQuery).not.toThrow()
          })

          it('is false', () => {
            expect(doQuery()).toBeFalsy()
          })
        })
      })

      context('and: invalid (42)', () => {
        const query = {
          and: 42,
        }

        describe('match', () => {
          const doQuery = () => boolQuery.query(query)

          it('throws', () => {
            expect(doQuery).toThrow()
          })
        })
      })

      context('and: object: single anyOf', () => {
        const query = {
          and: {
            anyOf: 'x',
          },
        }

        describe('match', () => {
          const doQuery = () => boolQuery.query(query)

          it('does not throws', () => {
            expect(doQuery).not.toThrow()
          })

          it('is true', () => {
            expect(doQuery()).toBeTruthy()
          })
        })
      })

      context('and: object: anyOf and allOf', () => {
        const query = {
          and: {
            anyOf: 'x',
            allOf: 'y',
          },
        }

        describe('match', () => {
          const doQuery = () => boolQuery.query(query)

          it('does not throws', () => {
            expect(doQuery).not.toThrow()
          })

          it('is true', () => {
            expect(doQuery()).toBeTruthy()
          })
        })
      })

      context('and: object: single anyOf in list', () => {
        const query = {
          and: [
            {
              anyOf: 'x',
            },
          ],
        }

        describe('match', () => {
          const doQuery = () => boolQuery.query(query)

          it('does not throws', () => {
            expect(doQuery).not.toThrow()
          })

          it('is true', () => {
            expect(doQuery()).toBeTruthy()
          })
        })
      })

      context('and: list with two anyof objects: x, y', () => {
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
          const result = boolQuery.query(query)

          it('returns combined query result using AND', () => {
            expect(result).toBeTruthy()
          })
        })

        describe('query', () => {
          const result = boolQuery.query(query)

          it('returns combined query result using AND', () => {
            // what to expect??
            expect(result).toEqual({})
          })
        })
      })
    })
  })
})
