import { node, context } from '../..'

const { query } = node
const { createAndQuery } = query.boolean

describe('node query', () => {
  describe('createAndQuery', () => {
    context('tester: always true', () => {
      const tester = (expr: any) => {
        return true
      }

      const value = 42

      context('no tester passed - use default', () => {
        const opts = {
          value,
        }
        const boolQuery = createAndQuery(opts)

        describe('boolQuery', () => {
          it('has the options', () => {
            expect(boolQuery.options).toBe(opts)
          })

          describe('default tester', () => {
            it('has a tester', () => {
              expect(boolQuery.tester).toBeDefined()
            })

            it('is a list tester: ListMatcher', () => {
              expect(boolQuery.tester.caption).toBe('ListMatcher')
            })
          })

          it('has value: 42', () => {
            expect(boolQuery.value).toBe(value)
          })
        })

        context('query: empty', () => {
          const opts = {
            tester,
            value,
          }
          const boolQuery = createAndQuery(opts)

          const query = {}

          describe('boolQuery', () => {
            it('has the options', () => {
              expect(boolQuery.options).toBe(opts)
            })

            it('has the tester', () => {
              expect(boolQuery.tester).toBe(tester)
            })

            it('has value: 42', () => {
              expect(boolQuery.value).toBe(value)
            })
          })

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
})
