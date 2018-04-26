import { log, context, testerFor } from '../_imports'
import { NodesTester } from '../../../../../src/ts/node/tester/generic'

class MyNodesTester extends NodesTester {
  constructor(node: any, options: any) {
    super(node, options)
  }
}

describe('NodesTester', () => {
  context('identifier file', () => {
    const declsTester: any = testerFor({
      fileName: 'identifier',
      type: 'delc.vars',
      traverse: (statements: any[]) => {
        const node = statements[0]
        return node.declarationList.declarations
      },
    })

    const node = declsTester.node
    const factories = declsTester.options.factories

    describe('init', () => {
      context('with no itemTester', () => {
        const tester = new MyNodesTester(node, {
          factories,
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

      describe('test(query)', () => {
        const query = {
          names: {
            anyOf: 'x',
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
