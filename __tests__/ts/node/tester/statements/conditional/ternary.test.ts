import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('ternary: condition ? whenTrue : whenFalse', () => {
  context('ternary file', () => {
    const tester = testerFor({
      fileName: 'ternary',
      type: 'ternary'
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


