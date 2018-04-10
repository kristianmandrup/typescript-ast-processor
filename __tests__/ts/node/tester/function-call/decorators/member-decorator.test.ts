import {
  testerFor,
  context,
  logObj,
} from '../_imports'

describe('class member decorator', () => {
  context('member-decorator file', () => {
    const tester: any = testerFor({
      fileName: 'member-decorator',
      type: 'function-call/decorators',
      factoryName: 'decorator.member',
      // statementIndex: 2
      traverse(statements: any[]) {
        const awaitExpr = statements[2].expression
        return awaitExpr.expression
      }

    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          "name": "prompt",
          "arguments": {
            "items": [
              {}
            ],
            "count": 1
          }
        })
      })
    })
  })
})
