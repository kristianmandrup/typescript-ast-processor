import { context, testerFor } from '../_imports'

describe('QueryEngine', () => {
  context('identifier file', () => {
    const tester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
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

    describe('initQueries', () => {
      context('no queries to be resolved', () => {})

      context('queries to be resolved', () => {})
    })

    describe('arrayIteratorFindMethod(obj)', () => {})
    describe('queryItems(items: any[], query: any, options)', () => {})

    describe('resolvePropTester', () => {})
    describe('resolveQueries', () => {})
    describe('runQueries', () => {})
    describe('runTests', () => {})

    describe('runTest', () => {})
    describe('queryName', () => {})
    describe('queryNames', () => {})

    describe('test', () => {})
    describe('testCount', () => {})
    describe('testNot', () => {})
    describe('testOr', () => {})
    describe('testAnd', () => {})

    describe('query', () => {})
    describe('queryValue', () => {})
  })
})
