import {
  testerFor,
  context,
  logObj,
} from '../_imports'

describe('function call', () => {
  describe('await', () => {
    context('await-function-call file', () => {
      const tester: any = testerFor({
        fileName: 'await-function-call',
        type: 'function/call',
        factoryName: 'function.call',
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
})
