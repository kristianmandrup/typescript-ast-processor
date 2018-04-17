import { context, testerFor } from '../_imports'

describe('NodeCounter', () => {
  context('identifier file', () => {
    const tester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
    })

    describe('get:occurenceTester', () => {
      context('no occurenceTester', () => {
        it('creates an occurenceTester', () => {
          const occurenceTester = tester.occurrenceTester
          expect(occurenceTester).toBeDefined()
        })
      })

      context('cached occurenceTester', () => {
        it('returns cached occurenceTester', () => {
          const cached = tester.occurrenceTester
          const occurenceTester = tester.occurrenceTester
          expect(occurenceTester).toBe(cached)
        })
      })
    })
  })
})
