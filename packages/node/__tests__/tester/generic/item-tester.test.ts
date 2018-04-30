import { context, testerFor } from '../_imports'
import {
  // createNodeListTester,
  // createSingleNodeTester,
  NodeListTester,
  SingleNodeTester,
} from '../../../../../src/ts/node/tester/generic'

class MyNodesTester extends NodeListTester {}

class MySingleNodeTester extends SingleNodeTester {}

describe('NodesTester', () => {
  context('identifier file', () => {
    const declsTester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      factory: 'decl.vars',
      traverse: (statements: any[]) => {
        const node = statements[0]
        return node.declarationList
      },
    })

    const node = declsTester.node
    const factories = declsTester.options.factories
    const nodesMap = {
      matching: {
        name: 'x',
      },
      nomatch: {
        name: 'unknown',
      },
    }

    const queryMap = {
      empty: {},
      one: {
        anyOf: 'x',
      },
      many: {
        anyOf: 'x',
        allOf: ['y', /z/],
      },
    }

    const items = [{ name: 'x' }]

    describe('node', () => {
      it('has a node', () => {
        expect(node).toBeDefined()
      })
    })

    describe('factories', () => {
      it('has a factories map', () => {
        expect(typeof factories).toBe('object')
      })
    })

    describe('init', () => {
      const node = declsTester.node

      context('with items but no itemTester', () => {
        const listTester = new MyNodesTester(node, {
          factories,
          items,
        })

        const nodeTester = new MySingleNodeTester(listTester, node, {})

        it('itemNodeQueryFn is tester function', () => {
          expect(nodeTester.itemNodeQueryFn).toBe(nodeTester.tester.tester)
        })
      })

      context('with itemTester', () => {
        const listTester = new MyNodesTester(node, {
          factories,
          items,
          itemTester(node: any, query: any) {
            return true
          },
        })

        const nodeTester = new MySingleNodeTester(listTester, node, {})

        it('itemNodeQueryFn is itemTester function', () => {
          expect(nodeTester.itemNodeQueryFn).toBe(nodeTester.tester.itemTester)
        })
      })
    })

    context('nodeTester', () => {
      const listTester = new MyNodesTester(node, {
        factories,
        items,
      })

      const nodeTester = new MySingleNodeTester(listTester, node, {})

      // resolveIteratorFn(node: any, queryDetails: any): any[]
      describe('resolveQueryExpList(node, queryDetails)', () => {
        context('empty queryExpr', () => {
          const resolved = nodeTester.resolveQueryExpList(node, {
            queryExpr: queryMap.empty,
          })

          it('is a list of 0', () => {
            expect(resolved.length).toBe(0)
          })
        })

        context('queryExpr has one expr', () => {
          const resolved = nodeTester.resolveQueryExpList(node, {
            queryExpr: queryMap.one,
          })

          it('is a list of 1', () => {
            expect(resolved.length).toBe(1)
          })
        })

        context('queryExpr has multiple exprs', () => {
          const resolved = nodeTester.resolveQueryExpList(node, {
            queryExpr: queryMap.many,
          })

          it('is a list of 2', () => {
            expect(resolved.length).toBe(2)
          })
        })
      })

      // testNode(node: any, queryDetails: any): boolean
      describe('testNode(node, queryDetails)', () => {
        context('matching result', () => {
          const tn = nodeTester.test({ queryExpr: queryMap.one })

          it('is truthy', () => {
            expect(tn).toBeTruthy()
          })
        })

        context('no matching result', () => {
          const tn = nodeTester.test({ queryExpr: queryMap.empty })

          it('is falsy', () => {
            expect(tn).toBeFalsy()
          })
        })
      })

      describe('testItem(node, query)', () => {
        const query = {
          names: {
            anyOf: 'x',
          },
        }

        context('matching result', () => {
          const ti = nodeTester.testItem(nodesMap.matching, query)

          it('is truthy', () => {
            expect(ti).toBeTruthy()
          })
        })

        context('no matching result', () => {
          const ti = nodeTester.testItem(nodesMap.nomatch, query)

          it('is falsy', () => {
            expect(ti).toBeFalsy()
          })
        })
      })
    })
  })
})
