import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('variable declarations', () => {
  context('var-decls file', () => {
    const testers = testerFor({
      fileName: 'var-decls',
      type: 'var-decl',
      indexMap: ['const', 'let', 'var']
    })

    context('const', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.const.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })
    })

    context('let', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.let.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })
    })

    context('var', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.var.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })
    })
  })
})
