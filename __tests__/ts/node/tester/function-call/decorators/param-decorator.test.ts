import {
  testerFor,
  context,
  logObj,
} from '../_imports'

describe('function parameter decorator', () => {
  context('parameter decorator file', () => {
    const tester: any = testerFor({
      fileName: 'parameter-decorator',
      type: 'function-call/decorators',
      factoryName: 'decorator.parameter',
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
