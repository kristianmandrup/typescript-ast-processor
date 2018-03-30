import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('variable declaration', () => {
  context('var-decls file', () => {
    const testers = testerFor('var-decls', {
      type: 'var-decl',
      indexMap: ['num', 'bool', 'str', 'obj', 'arr']
    })

    context('number', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.num.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })
    })

    context('bool', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.num.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })
    })
  })
})
