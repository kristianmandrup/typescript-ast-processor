import { context, testerFor } from '../_imports'
import { isEmpty } from '../../../../../src/ts/util'

describe('TestersRegistry', () => {
  context('identifier file', () => {
    const tester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
    })

    describe('resolveFactoryName(name)', () => {
      it('sets the named tester in registry', () => {
        const resolved = tester.resolveFactoryName('class')
        expect(resolved).toBeDefined()
      })
    })
    describe('resolveTypeAndName(name)', () => {
      it('sets the named tester in registry', () => {
        const resolved = tester.resolveTypeAndName('details:function')
        expect(resolved.type).toBe('details')
        expect(resolved.name).toBe('function')
      })
    })
    describe('resolveTypeNameAndFactory(name, factory)', () => {
      it('resolves to: details, function, decl.function ', () => {
        const resolved = tester.resolveTypeNameAndFactory('function')
        expect(resolved.type).toBe('details')
        expect(resolved.name).toBe('function')
        expect(resolved.factory).toBe('decl.function')
      })
    })

    describe('setTester', () => {
      context('set identifier tester', () => {
        tester.setTester({
          name: 'identifier',
        })

        it('sets the named tester in registry', () => {
          expect(tester.testers['identifier']).toBeDefined()
        })
      })
    })

    describe('setTesters', () => {
      context('no testerMap', () => {
        beforeAll(() => {
          tester.testerMap = {}
          tester.setTesters()
        })

        it('no testers set', () => {
          expect(isEmpty(tester.testers)).toBeTruthy()
        })
      })

      context('has testerMap', () => {
        beforeAll(() => {
          tester.testerMap = {
            id: 'identifier',
          }
          tester.setTesters()
        })

        it('sets the tester named id in registry', () => {
          expect(tester.testers['id']).toBeDefined()
        })
      })
    })

    describe('getTester', () => {
      context('no testers', () => {
        beforeAll(() => {
          tester.testerMap = {}
          tester.setTesters()
        })

        it('tester named id can NOT be retrieved', () => {
          expect(tester.getTester('id')).toBeFalsy()
        })
      })

      context('has tester id registered', () => {
        beforeAll(() => {
          tester.testerMap = {
            id: 'identifier',
          }
          tester.setTesters()
        })

        it('tester named id can be retrieved', () => {
          expect(tester.getTester('id')).toBeDefined()
        })
      })
    })

    describe('hasTester', () => {
      context('no testers', () => {
        beforeAll(() => {
          tester.testerMap = {}
          tester.setTesters()
        })

        it('tester id: false', () => {
          expect(tester.hasTester('id')).toBeFalsy()
        })
      })

      context('has tester id registered', () => {
        beforeAll(() => {
          tester.testerMap = {
            id: 'identifier',
          }
          tester.setTesters()
        })

        it('tester id: true', () => {
          expect(tester.hasTester('id')).toBeTruthy()
        })
      })
    })

    describe('getProp(opts)', () => {
      it('gets the tester prop', () => {
        expect(
          tester.getProp({
            name: 'identifier',
          }),
        ).toBeDefined()
      })
    })
  })
})
