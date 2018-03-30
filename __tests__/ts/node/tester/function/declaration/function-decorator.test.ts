import {
  testerFor,
  context,
  logObj
} from '../_imports'

describe('function', () => {
  describe('custom decorator', () => {
    context('function-decorator file', () => {
      const tester: any = testerFor({
        fileName: 'generator-function',
        type: 'function',
        category: 'declaration',
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
