import { context, testerFor } from '../_imports'
import { isEmpty } from '../../../../../src/ts/util'
import { createTesterIdResolver } from '../../../../../src/ts/node/tester/base/tester-id-resolver'

describe('TesterIdResolver', () => {
  context('resolver', () => {
    const resolver = createTesterIdResolver({})
    describe('resolveTypeAndName(name)', () => {
      context('details:function', () => {
        const resolved = resolver.resolve('details:function')

        it('resolves type to: details', () => {
          expect(resolved.type).toBe('details')
        })
        it('resolves name to: function', () => {
          expect(resolved.name).toBe('function')
        })
      })
    })

    context('function', () => {
      const resolved = resolver.resolve('function')

      it('resolves type to: node', () => {
        expect(resolved.type).toBe('node')
      })
      it('resolves name to: function', () => {
        expect(resolved.name).toBe('function')
      })
    })
  })
})
