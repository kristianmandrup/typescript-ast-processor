import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('block statement', () => {
  context('block file', () => {
    const tester = testerFor({
      fileName: 'block',
      type: 'block',
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
