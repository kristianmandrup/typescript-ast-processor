import { context, testerFor } from '../_imports'
import { BaseNodeTester } from '../../../../../src/ts/node/tester/base'

class MyBaseNodeTester extends BaseNodeTester {}

describe('BaseNodeTester', () => {
  context('identifier file', () => {
    const idTester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
    })

    const tester = new MyBaseNodeTester(idTester.node, {})

    describe('get:testerMap', () => {
      it('is {}', () => {
        expect(tester.testMethodMap).toEqual({})
      })
    })

    describe('initInfoProps', () => {
      it('props are empty object default', () => {
        expect(tester.initInfoProps()).toEqual({})
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
