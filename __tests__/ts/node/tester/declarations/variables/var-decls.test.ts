import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('variable declarations', () => {
  context('var-decls file', () => {
    const testers = testerFor({
      fileName: 'var-decls',
      type: 'variables',
      indexMap: ['const', 'let', 'var'],
      factoryName: 'decl.vars',
      traverseToIndex(index: number) {
        return (statements: any[]) => {
          return statements[index].declarationList.declarations[0]
        }
      }
    })

    context('const', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.const.info()
          logObj('info', info)
          expect(info).toEqual({
            "count": 2,
            "names": [
              "cx",
              "cy"
            ]
          })
        })
      })
    })

    context('let', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.let.info()
          logObj('info', info)
          expect(info).toEqual({
            "count": 3,
            "names": [
              "bx",
              "by",
              "bz"
            ]
          })
        })
      })
    })

    context('var', () => {
      describe('info()', () => {
        it('collects correct info', () => {
          const info = testers.var.info()
          logObj('info', info)
          expect(info).toEqual({
            "count": 3,
            "names": [
              "vx",
              "vy",
              "vz"
            ]
          })
        })
      })
    })
  })
})
