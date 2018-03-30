import {
  testerFor,
  context,
  logObj,
} from '../_imports'

describe('function call', () => {
  describe('generator', () => {
    context('generator-function-call file', () => {
      const tester: any = testerFor({
        fileName: 'generator-function-call',
        type: 'function',
        category: 'call'
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })
    })
  })
})
