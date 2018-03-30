import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('variable declaration', () => {
  context('var-decls file', () => {
    const testers = testerFor({
      fileName: 'var-decl',
      type: 'var-decl',
      indexMap: ['number', 'boolean', 'string', 'object', 'array']
    })

    context('number', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.number.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })
    })

    context('number', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.boolean.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })
    })

    context('string', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.string.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })
    })

    context('object', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.object.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })
    })

    context('array', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.array.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })
    })

  })
})
