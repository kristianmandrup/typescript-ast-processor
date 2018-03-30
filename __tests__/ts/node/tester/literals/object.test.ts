import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('object literal', () => {
  context('object file', () => {
    const tester = testerFor({
      fileName: 'object',
      type: 'object'
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
