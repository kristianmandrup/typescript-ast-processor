import { context, testerFor } from '../_imports'

describe('TestersRegistry', () => {
  context('identifier file', () => {
    const tester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
    })

    describe('setTesters', () => {
      context('no testers in testerMap', () => {})

      context('testers in testerMap', () => {})
    })

    describe('setTester', () => {})
    describe('setTesters', () => {})
    describe('getTester', () => {})
    describe('hasTester', () => {})

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
