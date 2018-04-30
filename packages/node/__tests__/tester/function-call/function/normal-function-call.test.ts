import {
  testerFor,
  context,
  query,
  logObj,
} from '../_imports'

describe('function call', () => {
  describe('normal', () => {
    context('call-function file', () => {
      const tester: any = testerFor({
        fileName: 'normal-function-call',
        type: 'function/call',
        factoryName: 'function.call',
        // statementIndex: 2
        traverse(statements: any[]) {
          return statements[1].expression
        }
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            "name": "hello",
            "arguments": {
              "items": [
                {}
              ],
              "count": 1
            }
          })
        })
      })

      describe('test(query)', () => {
        context('matching query', () => {
          const query = {
            id: 'hello',
            arguments: {
              count: {
                min: 1
              }
            }
          }

          it('matches query to return true', () => {
            const result = tester.test(query)
            logObj('result', result)
            expect(result).toBe(true)
          })
        })

        context('non-matching query', () => {
          const query = {
            id: 'hello', // or noname?
            arguments: {
              count: {
                min: 1
              }
            }
          }

          it('does not matches query and returns false', () => {
            const result = tester.test(query)
            logObj('result', result)
            expect(result).toBe(true)
          })
        })
      })

      describe('query(query)', () => {
        it('queries for matches', () => {
          // TODO: query imported - move here instead!

          const match = tester.query(query)
          logObj('match', match)
          expect(match).toEqual({
          })
        })
      })
    })
  })
})
