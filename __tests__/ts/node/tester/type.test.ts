import {
  logObj,
  testerFor,
  context
} from './_imports'

describe('type', () => {
  context('type file', () => {
    const tester: any = testerFor({
      fileName: 'type'
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

