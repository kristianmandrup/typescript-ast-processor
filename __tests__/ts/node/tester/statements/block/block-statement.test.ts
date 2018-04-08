import {
  logObj,
  testerFor,
  context
} from '../_imports'

// TODO:
// Not sure if we need this distinction, looks to be the same node,
// ie. an ifStatement thenStatement etc, are all block statement nodes!
describe('block statement', () => {
  context('block file', () => {
    const tester = testerFor({
      fileName: 'block/block',
      type: 'statements',
      factoryName: 'block',
      traverse: (statements: any[]) => {
        return statements[0].thenStatement
      }
    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          nestedLevels: 1
        })
      })
    })
  })
})
