import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('while loop', () => {
  describe('while do', () => {
    context('while-do file', () => {
      const tester = testerFor({
        fileName: 'while-do',
        type: 'whileDo'
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

  describe('do while', () => {
    context('do-while file', () => {
      const tester = testerFor({
        fileName: 'do-while',
        type: 'doWhile'
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
