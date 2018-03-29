import {
  node,
  logObj,
  testerFor,
  context
} from './_imports'

describe('initializer', () => {
  describe('arrow', () => {
    context('arrow-function file', () => {
      const tester: any = testerFor('initializer', {
        type: 'initializer'
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
})
