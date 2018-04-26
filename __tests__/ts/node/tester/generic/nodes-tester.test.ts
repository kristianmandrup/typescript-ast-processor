import { log, context, testerFor } from '../_imports'
import { NodesTester } from '../../../../../src/ts/node/tester/generic'

class MyNodesTester extends NodesTester {
  // constructor(node: any, options: any) {
  //   super(node, options)
  // }
}

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
      const items = [{ name: 'x' }]

      describe('node', () => {
        it('has a node', () => {
          expect(node).toBeDefined()
        })
      })

      context('node not a list and no items', () => {
        it('fails on initialization', () => {
          const createTester = () =>
            new MyNodesTester(node, {
              factories,
            })

          expect(createTester).toThrow()
        })
      })

      context('with items but no itemTester', () => {
        const tester = new MyNodesTester(node, {
          factories,
          items,
        })

        it('inits props', () => {
          expect(tester.props).toBeDefined()
        })

        it('has itemTester function', () => {
          expect(tester.itemTester).toBeUndefined()
        })

        it('itemNodeQueryFn is tester function', () => {
          expect(tester.itemNodeQueryFn).toBe(tester.tester)
        })
      })

      context('with itemTester', () => {
        const tester = new MyNodesTester(node, {
          factories,
          items,
        })

        it('inits props', () => {
          expect(tester.props).toBeDefined()
        })

        it('has itemTester function', () => {
          expect(typeof tester.itemTester).toBe('function')
        })

        it('itemNodeQueryFn is itemTester function', () => {
          expect(tester.itemNodeQueryFn).toBe(tester.itemTester)
        })
      })

      context('with no key', () => {
        const tester = new MyNodesTester(node, {
          factories,
        })

        it('sets nodes to be the node', () => {
          expect(typeof tester.nodes).toBe(tester.node)
        })
      })

      context('with keys', () => {
        const key = 'declarations'
        const tester = new MyNodesTester(node, {
          factories,
          key,
        })

        it('sets nodes to key entry on node', () => {
          expect(typeof tester.nodes).toBe(tester.node[key])
        })
      })

      context('query', () => {
        const query = {
          names: {
            anyOf: 'x',
          },
        }
        const nodes: any[] = []
        const tester = new MyNodesTester(nodes, {
          factories,
        })

        describe('iteratorDetails(query)', () => {
          context('details', () => {
            // queryExpr,
            // iteratorMethod,
            const details = tester.iteratorDetails(query)

            it('has queryExpr', () => {
              expect(details.queryExpr).toBeDefined()
            })

            it('has iteratorMethod', () => {
              expect(details.iteratorMethod).toBeDefined()
            })
          })
        })

        // resolveIteratorFn(node: any, queryDetails: any): any[]
        describe('resolveQueryExpList(node, queryDetails)', () => {
          context('empty queryExpr', () => {
            const resolved = tester.resolveQueryExpList(node, {
              queryExpr: queryMap.empty,
            })

            it('is a list of 0', () => {
              expect(resolved.length).toBe(0)
            })
          })

          context('queryExpr has one expr', () => {
            const resolved = tester.resolveQueryExpList(node, {
              queryExpr: queryMap.one,
            })

            it('is a list of 1', () => {
              expect(resolved.length).toBe(1)
            })
          })

          context('queryExpr has multiple exprs', () => {
            const resolved = tester.resolveQueryExpList(node, {
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
            const tn = tester.testNode(node, { queryExpr: queryMap.one })

            it('is truthy', () => {
              expect(tn).toBeTruthy()
            })
          })

          context('no matching result', () => {
            const tn = tester.testNode(node, { queryExpr: queryMap.empty })

            it('is falsy', () => {
              expect(tn).toBeFalsy()
            })
          })
        })

        describe('testItem(node, query)', () => {
          context('matching result', () => {
            const ti = tester.testItem(nodesMap.matching, query)

            it('is truthy', () => {
              expect(ti).toBeTruthy()
            })
          })

          context('no matching result', () => {
            const ti = tester.testItem(nodesMap.nomatch, query)

            it('is falsy', () => {
              expect(ti).toBeFalsy()
            })
          })
        })

        describe('test(query)', () => {
          const query = {
            names: {
              anyOf: 'x',
              allOf: ['y'],
            },
          }

          context('empty nodes', () => {
            const nodes: any[] = []
            const tester = new MyNodesTester(nodes, {
              factories,
            })
            const test = () => tester.test(query)

            it('does not throw', () => {
              expect(test).not.toThrow()
            })

            it('returns empty result', () => {
              const result = test()
              expect(result).toEqual({})
            })
          })

          context('has matching nodes', () => {
            const nodes: any[] = [
              {
                name: 'x',
              },
              {
                name: 'y',
              },
            ]
            const tester = new MyNodesTester(nodes, {
              factories,
            })
            const test = () => tester.test(query)

            it('does not throw', () => {
              expect(test).not.toThrow()
            })

            it('returns match result', () => {
              const result = test()
              expect(result).toEqual({
                name: 'x',
              })
            })
          })
        })
      })
    })
  })
})
