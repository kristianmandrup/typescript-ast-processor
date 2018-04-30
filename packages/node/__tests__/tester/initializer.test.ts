import {
  log,
  logObj,
  testerFor,
  context
} from './_imports'

describe('initializer', () => {
  context('initializer file', () => {
    const tester: any = testerFor({
      fileName: 'initializer',
      type: 'initializer',
      // statementIndex: 0
      traverse: (statements: any[]) => {
        // find ObjectLiteralExpression (kind = 179)
        return statements[0].declarationList.declarations[0].initializer
      }
    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        // log('node', tester.node)
        // logObj('info', info)
        expect(info).toEqual({
          "type": "object",
          "value": {
            "y": 32
          },
          "textValue": "{\n  y: 32\n}"
        })
      })
    })
  })
})

