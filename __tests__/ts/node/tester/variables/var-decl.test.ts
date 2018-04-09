import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('variable declaration', () => {
  context('var-decls file', () => {
    const testers = testerFor({
      fileName: 'var-decl',
      type: 'variables',
      factoryName: 'decl.var',
      indexMap: ['number', 'boolean', 'string', 'object', 'array'],
      traverseToIndex(index: number) {
        return (statements: any[]) => {
          return statements[index].declarationList.declarations[0]
        }
      }
    })

    context('number', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.number.info()
          logObj('info', info)
          expect(info).toEqual({
            name: '_a',
            varType: 'unknown'
          })
        })
      })
    })

    context('boolean', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.boolean.info()
          logObj('info', info)
          expect(info).toEqual({
            name: '_b',
            varType: 'unknown'
          })
        })
      })
    })

    context('string', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.string.info()
          logObj('info', info)
          expect(info).toEqual({
            name: '_c',
            varType: 'unknown'
          })
        })
      })
    })

    context('object', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.object.info()
          logObj('info', info)
          expect(info).toEqual({
            name: '_d',
            varType: 'unknown'
          })
        })
      })
    })

    context('array', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.array.info()
          logObj('info', info)
          expect(info).toEqual({
            name: '_e',
            varType: 'unknown'
          })
        })
      })
    })
  })
})
