import {
  testerFor,
  context,
  query,
  logObj,
  log,
} from '../_imports'

describe('function call', () => {
  describe('normal', () => {
    context('call-function file', () => {
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
