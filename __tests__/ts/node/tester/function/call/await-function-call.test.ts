import {
  testerFor,
  context,
  logObj,
} from '../_imports'

describe('function call', () => {
  describe('await', () => {
    context('await-function-call file', () => {
      const tester: any = testerFor({
        fileName: 'await-function-call',
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
