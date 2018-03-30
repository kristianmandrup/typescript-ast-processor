import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('switch', () => {
  context('switch file', () => {
    const tester = testerFor({
      fileName: 'switch',
      type: 'switch'
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
