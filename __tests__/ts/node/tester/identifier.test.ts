import {
  logObj,
  testerFor,
  context
} from './_imports'

describe('identifier', () => {
  context('identifier file', () => {
    context('var', () => {
      const tester: any = testerFor({
        fileName: 'identifier',
        type: 'identifier',
        traverse: (statements: any[]) => {
          return statements[0] //.declarationList.declarations[0]
        }
      })

      describe('name', () => {
        it('returns identifier', () => {
          const name = tester.name
          expect(name).toEqual('ab')
        })
      })

      describe('isExported', () => {
        it('is not exported', () => {
          const exported = tester.isExported
          expect(exported).toBeFalsy()
        })
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            exported: false,
            name: 'ab'
          })
        })
      })
    })

    context('exported var', () => {
      const tester: any = testerFor({
        fileName: 'identifier',
        type: 'identifier',
        traverse: (statements: any[]) => {
          return statements[1] // .declarationList.declarations[0]
        }
      })

      describe('name', () => {
        it('returns identifier', () => {
          const name = tester.name
          expect(name).toEqual('xyz')
        })
      })

      describe('isExported', () => {
        it('is exported', () => {
          const exported = tester.isExported
          expect(exported).toBeTruthy()
        })
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            exported: true,
            name: 'xyz'
          })
        })
      })

    })
  })
})

