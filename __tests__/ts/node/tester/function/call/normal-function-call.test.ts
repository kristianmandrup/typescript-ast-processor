import {
  testerFor,
  context,
  query,
  logObj,
  log,
} from '../_imports'

describe('function call', () => {
  describe('normal', () => {
    context('call-function file', () => {
      const tester: any = testerFor({
        fileName: 'generator-function-call',
        type: 'function',
        category: 'call'
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj(info)
          expect(info).toEqual({
          })
        })
      })

      describe.skip('test(query)', () => {
        context('matching query', () => {
          const query = {
            id: 'hello',
            parameters: {
              names: {
                anyOf: ['name']
              }
            }
          }

          it('matches query to return true', () => {
            const result = tester.test(query)
            logObj(result)
            expect(result).toBe(true)
          })
        })

        context('non-matching query', () => {
          const query = {
            id: 'hello', // or noname?
            parameters: {
              names: {
                anyOf: ['unknown']
              }
            }
          }

          it('does not matches query and returns false', () => {
            const result = tester.test(query)
            logObj(result)
            expect(result).toBe(true)
          })
        })
      })

      describe.skip('query(query)', () => {
        it('queries for matches', () => {
          const match = tester.query(query)
          logObj(match)
          expect(match).toEqual({
          })
        })
      })
    })
  })
})
