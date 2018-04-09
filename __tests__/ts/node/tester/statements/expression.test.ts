import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('expression', () => {
  context('expression file', () => {
    const tester = testerFor({
      fileName: 'expression',
      type: 'expression',
      factoryName: 'expression',
      statementIndex: 0
    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
        })
      })
    })
  })
})
