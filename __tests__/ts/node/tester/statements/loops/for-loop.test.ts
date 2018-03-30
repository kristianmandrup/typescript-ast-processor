import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('for loop', () => {
  describe('classic for', () => {
    context('for file', () => {
      const tester = testerFor({
        fileName: 'for',
        type: 'for'
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

  describe('for of', () => {
    context('for-of file', () => {
      const tester = testerFor({
        fileName: 'for-of',
        type: 'forOf'
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

  describe('for in', () => {
    context('for-in file', () => {
      const tester = testerFor({
        fileName: 'for-in',
        type: 'forIn'
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
