import {
  logObj,
  testerFor,
  context
} from './_imports'

describe('type', () => {
  context('type file', () => {
    const tester: any = testerFor({
      fileName: 'type',
      type: 'type',
      traverse: (statements: any[]) => {
        // find ObjectLiteralExpression (kind = 179)
        return statements[0].declarationList.declarations[0].type
      }
    })

    describe('typeName', () => {
      it('collects correct info', () => {
        const typeName = tester.typeName
        expect(typeName).toEqual('string')
      })
    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          typeName: 'string',
          "union": false,
          "unionTypes": [],
          "primitive": true,
          "complex": false
        })
      })
    })
  })
})

