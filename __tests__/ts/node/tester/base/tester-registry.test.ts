import { context, testerFor } from '../_imports'
import { isEmpty } from '../../../../../src/ts/util'
import { createTesterRegistry } from '../../../../../src/ts/node/tester/base/tester-registry'

describe('TesterRegistry', () => {
  context('identifier file', () => {
    const tester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
    })

    const registry = createTesterRegistry(tester, tester.options)

    describe('resolveFactoryName(name)', () => {
      it('sets the named tester in registry', () => {
        const resolved = registry.resolveFactoryName('class')
        expect(resolved).toBeDefined()
      })
    })

    describe.only('resolveTypeAndName(name)', () => {
      context('details:function', () => {
        const resolved = registry.resolveTypeAndName('details:function')

        it('resolves type to: details', () => {
          expect(resolved.type).toBe('details')
        })
        it('resolves name to: function', () => {
          expect(resolved.name).toBe('function')
        })
      })

      context('function', () => {
        const resolved = registry.resolveTypeAndName('function')

        it('resolves type to: node', () => {
          expect(resolved.type).toBe('node')
        })
        it('resolves name to: function', () => {
          expect(resolved.name).toBe('function')
        })
      })
    })

    describe.only('resolveTypeNameAndFactory(name, factory)', () => {
      context('details:function', () => {
        const resolved = registry.resolveTypeNameAndFactory('details:function')

        it('resolves type to: details', () => {
          expect(resolved.type).toBe('details')
        })
        it('resolves name to: function', () => {
          expect(resolved.name).toBe('function')
        })
        it('resolves factory to: function.decl', () => {
          // 'decl.function'
          expect(resolved.factory).toBe('function.decl')
        })
      })

      context('function', () => {
        const resolved = registry.resolveTypeNameAndFactory('function')

        it('resolves type to: node', () => {
          expect(resolved.type).toBe('node')
        })
        it('resolves name to: function', () => {
          expect(resolved.name).toBe('function')
        })
        it('resolves factory to: function.decl', () => {
          // decl.function
          expect(resolved.factory).toBe('function.decl')
        })
      })
    })

    describe('setTester', () => {
      context('set identifier tester', () => {
        registry.setTester({
          name: 'identifier',
        })

        it('sets the named tester in registry', () => {
          expect(registry.testers['identifier']).toBeDefined()
        })
      })
    })

    describe('setTesters', () => {
      context('no testerMap', () => {
        beforeAll(() => {
          registry.testerMap = {}
          registry.setTesters()
        })

        it('no testers set', () => {
          expect(isEmpty(registry.testers)).toBeTruthy()
        })
      })

      context('has testerMap', () => {
        beforeAll(() => {
          registry.testerMap = {
            id: 'identifier',
          }
          registry.setTesters()
        })

        it('sets the tester named id in registry', () => {
          expect(registry.testers['id']).toBeDefined()
        })
      })
    })

    describe('getTester', () => {
      context('no testers', () => {
        beforeAll(() => {
          registry.testerMap = {}
          registry.setTesters()
        })

        it('tester named id can NOT be retrieved', () => {
          expect(registry.getTester('id')).toBeFalsy()
        })
      })

      context('has tester id registered', () => {
        beforeAll(() => {
          registry.testerMap = {
            id: 'identifier',
          }
          registry.setTesters()
        })

        it('tester named id can be retrieved', () => {
          expect(registry.getTester('id')).toBeDefined()
        })
      })
    })

    describe('hasTester', () => {
      context('no testers', () => {
        beforeAll(() => {
          registry.testerMap = {}
          registry.setTesters()
        })

        it('tester id: false', () => {
          expect(registry.hasTester('id')).toBeFalsy()
        })
      })

      context('has tester id registered', () => {
        beforeAll(() => {
          registry.testerMap = {
            id: 'identifier',
          }
          registry.setTesters()
        })

        it('tester id: true', () => {
          expect(registry.hasTester('id')).toBeTruthy()
        })
      })
    })

    describe('getProp(opts)', () => {
      it('gets the tester prop', () => {
        expect(
          registry.getProp({
            name: 'identifier',
          }),
        ).toBeDefined()
      })
    })
  })
})
