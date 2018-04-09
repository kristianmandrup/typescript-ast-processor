import {
  testerFor,
  context,
  logObj,
} from '../_imports'

describe('function call', () => {
  describe('generator', () => {
    context('generator-function-call file', () => {
      const tester: any = testerFor({
        fileName: 'generator-function-call',
        type: 'function/call',
        factoryName: 'function.call',
        // statementIndex: 1
        traverse(statements: any[]) {
          return statements[1].expression
        }
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            "name": "generator",
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
