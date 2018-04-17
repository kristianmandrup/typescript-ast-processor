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

    describe('configure', () => {})

    describe('get:testMethodMap', () => {})

    describe('get:testerMap', () => {})

    describe('getTester', () => {})
    describe('createTester', () => {})

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

    describe('get:modifiers', () => {})

    describe('get:props', () => {})

    describe('isQuery', () => {})

    describe('getProp', () => {})

    describe('propKeys', () => {})

    describe('info', () => {})

    describe('countOccurrence', () => {})

    describe('queryItems', () => {})
    describe('arrayIteratorFindMethod', () => {})
  })
})
