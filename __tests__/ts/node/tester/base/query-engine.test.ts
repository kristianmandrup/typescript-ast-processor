import { context, testerFor } from '../_imports'
import { QueryEngine } from '../../../../../src/ts/node/tester/base/query-engine'

describe('QueryEngine', () => {
  context('identifier file', () => {
    const tester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
    })

    const engine = new QueryEngine(tester, {})

    describe('initPropTesters', () => {
      context('empty testMethodMap', () => {
        beforeAll(() => {
          tester.initInfoProps()
        })

        it('does not create any test method', () => {
          expect(engine['testName']).toBeUndefined()
        })
      })

      context('has testMethodMap', () => {
        beforeAll(() => {
          engine.testMethodMap = () => {
            return {
              name() {
                return 'named'
              },
            }
          }
          engine.initPropTesters()
        })

        it('creates testName method', () => {
          expect(engine['testName']).toBeDefined()
        })
      })
    })

    describe('initQueries', () => {
      context('no queries to be resolved', () => {})

      context('queries to be resolved', () => {})
    })

    describe('queryItems(items: any[], query: any, options)', () => {
      it('queries for items', () => {
        const items = ['x']
        const query = {
          anyOf: [/x/],
        }
        const options = {
          // ??
        }

        const result = engine.queryItems(items, query, options)
        expect(result).toBeDefined()
      })
    })

    describe('resolvePropTester', () => {
      it('resolves a propery tester', () => {
        engine.tester.testName = (query: any) => {
          return 'x'
        }

        const testerFn = engine.resolvePropTester('name')
        const query = {
          anyOf: ['x'],
        }
        expect(typeof testerFn).toBe('function')
        const result = testerFn(query)

        expect(result).toBeDefined()
        expect(result).toBe('x')
      })
    })

    describe('resolveQueries', () => {
      let resolved: any
      beforeAll(() => {
        resolved = engine.resolveQueries()
      })

      it('resolves query map from props', () => {
        expect(typeof resolved).toBe('object')
      })

      it('resolves name prop to a prop query function', () => {
        expect(typeof resolved.name).toBe('function')
      })
    })

    describe('runQueries', () => {
      it('runs all queries and returns query result object', () => {
        const query = {
          name: {
            anyOf: ['x'],
          },
        }
        const result = engine.runQueries(query)
        expect(result.name).toBeDefined()
      })
    })

    describe('runTests', () => {
      it('runs all tests and returns boolean', () => {
        const query = {
          name: {
            anyOf: ['x'],
          },
        }
        const result = engine.runTests(query)
        expect(result.name).toBeTruthy()
      })
    })

    describe('runTest', () => {
      it('runs a single property test and returns boolean', () => {
        const query = {
          name: {
            anyOf: ['x'],
          },
        }
        const result = engine.runTest({
          query,
          name: 'identifier',
          qprop: 'name',
          test: 'testName',
        })
        expect(result).toBeTruthy()
      })
    })

    describe('test', () => {
      it('runs all tests and returns boolean', () => {
        const query = {
          name: {
            anyOf: ['x'],
          },
        }
        const result = engine.test(query)
        expect(result.name).toBeTruthy()
      })
    })

    describe('testCount', () => {
      it('runs all tests and returns boolean', () => {
        const query = {
          min: 2,
          max: 3,
        }
        const paramCount = 2
        const result = engine.testCount(query, paramCount)
        expect(result).toBeTruthy()
      })
    })

    describe('testNot', () => {
      it('runs test using boolean NOT', () => {
        const query = {
          name: {
            anyOf: ['x'],
          },
        }
        const result = engine.testNot(query, tester)
        expect(result).toBeFalsy()
      })
    })

    describe('testOr', () => {
      it('runs test using boolean OR', () => {
        const query = {
          name: {
            anyOf: ['x'],
          },
          types: {
            anyOf: ['string'],
          },
        }
        const result = engine.testOr(query, tester)
        expect(result).toBeFalsy()
      })
    })

    describe('testAnd', () => {
      it('runs test using boolean AND', () => {
        const query = {
          name: {
            anyOf: ['x'],
          },
          types: {
            anyOf: ['string'],
          },
        }
        const result = engine.testOr(query, tester)
        expect(result).toBeFalsy()
      })
    })

    describe('query', () => {
      it('runs all tests and returns query result object', () => {
        const query = {
          name: {
            anyOf: ['x'],
          },
        }
        const result = engine.query(query)
        expect(result.name).toBe('x')
      })
    })

    describe('queryName', () => {
      context('any of x or /y/', () => {
        const query = {
          anyOf: ['x', 'y'],
        }

        it('matches on: x', () => {
          const result = engine.queryName('x', query)
          expect(result).toBeTruthy()
        })

        it('does not matches on: z', () => {
          const result = engine.queryName('z', query)
          expect(result).toBeFalsy()
        })
      })
    })

    describe('queryNames', () => {
      context('any of x or /y/', () => {
        const query = {
          anyOf: ['x', /y/],
        }

        it('matches in list of: x, yle', () => {
          const result = engine.queryNames(['x', 'yle'], query)
          expect(result).toBeTruthy()
        })

        it('no matches in list of: z, a, b', () => {
          const result = engine.queryNames(['z', 'a', 'b'], query)
          expect(result).toBeFalsy()
        })
      })
    })

    describe('queryValue', () => {
      describe('queries on a generic value', () => {
        const gt2 = (val: number) => val > 2

        const query = {
          anyOf: [32, gt2],
        }

        it('matches > 2', () => {
          const result = engine.queryValue(33, query)
          expect(result).toBeTruthy()
        })

        it('matches == 32', () => {
          const result = engine.queryValue(32, query)
          expect(result).toBeTruthy()
        })

        it('does not match any', () => {
          const result = engine.queryValue(1, query)
          expect(result).toBeFalsy()
        })
      })
    })

    describe('queryItems', () => {})

    describe('arrayIteratorFindMethod', () => {})
  })
})
