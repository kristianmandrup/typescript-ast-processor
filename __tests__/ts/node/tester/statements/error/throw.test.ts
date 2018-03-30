import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('throw error statement', () => {
  context('throw file', () => {
    const tester = testerFor({
      fileName: 'throw',
      type: 'throw',
      statementIndex: 2
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
