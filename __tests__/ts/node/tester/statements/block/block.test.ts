import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('block', () => {
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
