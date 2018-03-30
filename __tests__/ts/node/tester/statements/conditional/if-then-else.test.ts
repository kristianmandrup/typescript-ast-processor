import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('if then', () => {
  describe('if then', () => {
    context('if-then file', () => {
      const tester = testerFor({
        fileName: 'if-then',
        type: 'ifThenElse'
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

  describe('if then else', () => {
    context('if-then-else file', () => {
      const tester = testerFor({
        fileName: 'if-then-else',
        type: 'ifThenElse'
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
