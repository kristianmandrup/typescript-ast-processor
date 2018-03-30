import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('try catch finally statement', () => {
  context('try-catch file', () => {
    const tester = testerFor({
      fileName: 'try-catch',
      type: 'tryCatch',
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
