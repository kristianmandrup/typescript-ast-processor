import { context, testerFor } from '../_imports'

describe('BaseNodeTester', () => {
  context('identifier file', () => {
    const tester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
    })

    describe('init', () => {
      it('inits props', () => {
        expect(tester.props).not.toBeUndefined()
      })
    })

    describe('validateInit', () => {
      context('no factories', () => {
        it('throws', () => {
          tester.factories = null
          expect(() => tester.validateInit()).toThrow()
        })
      })
      context('no node', () => {
        it('throws', () => {
          tester.node = null
          expect(() => tester.validateInit()).toThrow()
        })
      })
    })

    describe('initInfoProps', () => {
      it('props are empty object default', () => {
        expect(tester.initInfoProps()).toEqual({})
      })
    })

    describe('initPropTesters', () => {
      context('empty testMethodMap', () => {
        beforeAll(() => {
          tester.initInfoProps()
        })

        it('does not create any test method', () => {
          expect(tester.testName).not.toBeDefined()
        })
      })

      context('has testMethodMap', () => {
        beforeAll(() => {
          tester.testMethodMap = () => {
            return {
              name() {
                return 'named'
              },
            }
          }
          tester.initInfoProps()
        })

        it('creates testName method', () => {
          expect(tester.testName).toBeDefined()
        })
      })
    })

    describe('setTesters', () => {
      context('no testers in testerMap', () => {})

      context('testers in testerMap', () => {})
    })

    describe('initQueries', () => {
      context('no queries to be resolved', () => {})

      context('queries to be resolved', () => {})
    })

    describe('set:props', () => {
      it('sets props using list of strings', () => {
        const props = ['x']
        tester.props = props
        expect(tester._props).toBe(props)
      })

      it('sets props using object map', () => {
        const props = {
          x: true,
          y: false,
        }
        tester.props = props
        expect(tester._props).toEqual(['x'])
      })
    })

    describe('isQuery', () => {})

    describe('setTester', () => {})
    describe('setTesters', () => {})
    describe('getTester', () => {})
    describe('hasTester', () => {})
    describe('getProp', () => {})
    describe('runTest', () => {})
    describe('queryName', () => {})
    describe('queryNames', () => {})
    describe('queryValue', () => {})

    describe('createTester', () => {})
    describe('createCategoryTester', () => {})
    describe('createNodeTester', () => {})
    describe('createDetailsTester', () => {})
    describe('test', () => {})
    describe('query', () => {})
    describe('queryValue', () => {})

    describe('resolvePropTester', () => {})
    describe('resolveQueries', () => {})
    describe('runQueries', () => {})
    describe('runTests', () => {})
    describe('propKeys', () => {})

    describe('info', () => {})
    describe('countOccurrence', () => {})
    describe('testCount', () => {})

    describe('createListTester', () => {})
    describe('createTesterFor', () => {})
    describe('queryItems', () => {})
    describe('arrayIteratorFindMethod', () => {})

    describe('testNot', () => {})
    describe('testOr', () => {})
    describe('testAnd', () => {})

    describe('get:occurenceTester', () => {
      context('no occurenceTester', () => {
        it('creates an occurenceTester', () => {
          const occurenceTester = tester.occurrenceTester
          expect(occurenceTester).toBeDefined()
        })
      })

      context('cached occurenceTester', () => {
        it('returns cached occurenceTester', () => {
          const cached = tester.occurrenceTester
          const occurenceTester = tester.occurrenceTester
          expect(occurenceTester).toBe(cached)
        })
      })
    })
  })
})
