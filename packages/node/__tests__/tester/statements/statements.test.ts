import {
  testerFor,
  context,
  logObj
} from '../_imports'

describe('statements', () => {
  context('statements file', () => {
    const tester = testerFor({
      fileName: 'statements',
      type: 'statements'
    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          count: 5
        })
      })
    })
  })
})
