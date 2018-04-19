import { log, context, testerFor } from '../_imports'
import { BaseNodeTester } from '../../../../../src/ts/node/tester/base'

class MyNodeTester extends BaseNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }
}

describe('NodeTester', () => {
  context('identifier file', () => {
    const idTester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        const node = statements[0]
        return node //.declarationList.declarations[0]
      },
    })

    const node = idTester.node
    const factories = idTester.options.factories

    const tester = new MyNodeTester(node, {
      factories,
    })

    describe('init', () => {
      it('inits props', () => {
        expect(tester.props).toBeDefined()
      })
    })

    describe('caption', () => {
      it('has a caption: MyNodeTester', () => {
        expect(tester.caption).toBe('MyNodeTester')
      })
    })

    describe('category', () => {
      it('has a category: NodeTester', () => {
        expect(tester.category).toBe('NodeTester')
      })
    })

    describe('category', () => {
      it('has a category: NodeTester', () => {
        expect(tester.category).toBe('NodeTester')
      })
    })

    describe('get:modifiers', () => {
      it('has modiers', () => {
        expect(tester.modifiers).toBeDefined()
      })
    })

    describe('initProps', () => {
      it('inits props', () => {
        tester.initProps()
        expect(tester.props).toBeDefined()
      })
    })

    describe('get:props', () => {
      it('has props', () => {
        expect(tester.props).toEqual([])
      })
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
        expect(tester._props).toEqual(['x', 'y'])
      })
    })

    describe('init', () => {
      it('inits props', () => {
        expect(tester.props).toBeDefined()
      })
    })

    describe('validateInit', () => {
      context('no node', () => {
        it('throws', () => {
          tester.node = null
          expect(() => tester.validateInit()).toThrow()
        })
      })
    })

    describe('configure', () => {
      beforeAll(() => {
        tester.configure()
      })

      it('sets factory', () => {
        expect(tester.factory).toBeDefined()
      })

      it('sets testerRegistry', () => {
        expect(tester.testerRegistry).toBeDefined()
      })

      it('sets queryEngine', () => {
        expect(tester.queryEngine).toBeDefined()
      })
    })

    describe('get:testMethodMap', () => {
      it('is {}', () => {
        expect(tester.testMethodMap).toEqual({})
      })
    })

    describe.only('getTester', () => {
      it('retrieves nothing', () => {
        expect(tester.testMethodMap).toEqual({})
      })

      context('id tester registered', () => {
        beforeAll(() => {
          tester.testerRegistry.setTester({
            name: 'id',
            factory: 'identifier',
          })
        })

        it('retrieves id tester', () => {
          log({
            registry: tester.testerRegistry,
            testers: tester.testerRegistry.testers,
          })

          expect(tester.getTester('id')).toBeDefined()
        })
      })
    })

    describe.only('createTester', () => {
      it('creates a named tester', () => {
        const idTester = tester.createTester('identifier', tester.node)
        log('test: createTester', {
          idTester,
        })
        expect(idTester).toBeDefined()
      })
    })
  })
})
