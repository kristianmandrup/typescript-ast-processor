import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('statement', () => {
  context('statements file', () => {
    const tester = testerFor({
      fileName: 'statements',
      type: 'statement',
      statementIndex: 0
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
