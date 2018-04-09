import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('throw error statement', () => {
  context('throw file', () => {
    const tester = testerFor({
      fileName: 'throw',
      type: 'statements/error',
      factoryName: 'error.throw',
      statementIndex: 0
    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          error: 'unknown'
        })
      })
    })
  })
})
