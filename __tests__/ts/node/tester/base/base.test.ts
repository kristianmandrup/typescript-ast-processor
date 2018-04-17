import { context, testerFor } from '../_imports'
import { BaseNodeTester } from '../../../../../src/ts/node/tester/base'

class MyNodeTester extends BaseNodeTester {}

describe('BaseNodeTester', () => {
  context('identifier file', () => {
    const idTester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
    })

    const tester = new MyNodeTester(idTester.node, {})

    describe('init', () => {
      it('inits props', () => {
        expect(tester.props).toBeDefined()
      })
    })

    describe('initProps', () => {
      it('inits props', () => {
        tester.initProps()
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

    describe('get:testerMap', () => {
      it('is {}', () => {
        expect(tester.testMethodMap).toEqual({})
      })
    })

    describe('getTester', () => {
      it('retrieves nothing', () => {
        expect(tester.testMethodMap).toBeUndefined()
      })

      context('id tester registered', () => {
        beforeAll(() => {
          tester.testerRegistry.setTester({
            name: 'id',
            factory: 'identifier',
          })
        })

        it('retrieves id tester', () => {
          expect(tester.getTester('id')).toBeDefined()
        })
      })
    })

    describe('createTester', () => {
      it('creates a named tester', () => {
        const idTester = tester.createTester('identifier', tester.node)
        expect(idTester).toBeDefined()
      })
    })

    describe('initInfoProps', () => {
      it('props are empty object default', () => {
        expect(tester.initInfoProps()).toEqual({})
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
        expect(tester._props).toEqual(['x'])
      })
    })

    describe('get:modifiers', () => {
      it('has modiers', () => {
        expect(tester.modifiers).toBeDefined()
      })
    })

    describe('get:props', () => {
      it('has props', () => {
        expect(tester.props).toEqual([])
      })
    })

    describe('isQuery(query)', () => {
      it('is a query', () => {
        expect(tester.isQuery({})).toBeTruthy()
      })
    })

    describe('propKeys', () => {
      it('is a list of strings (props)', () => {
        expect(tester.propKeys).toBe(tester.props)
      })
      it('first key is a string', () => {
        const key = tester.propKeys[0]
        expect(typeof key).toBe('string')
      })
    })

    describe('info', () => {
      it('retrieves the info', () => {
        const info = tester.info
        expect(typeof info).toBe('object')
        expect(info).toEqual({
          name: 'hello',
        })
      })
    })

    describe('countOccurrence', () => {
      it('counts occurrences of var declarations within scope: 1', () => {
        const count = tester.countOccurrence({
          nodeTypes: {
            toCount: ['VariableDeclaration'],
          },
        })
        expect(count).toBe(1)
      })
    })
  })
})
