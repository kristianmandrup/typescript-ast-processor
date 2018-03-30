import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('array literal', () => {
  context('array file', () => {
    const tester = testerFor({
      fileName: 'array',
      type: 'array'
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
