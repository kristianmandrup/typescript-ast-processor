import {
  testerFor,
  query,
  context,
  logObj
} from '../_imports'

const { log } = console

describe('class', () => {
  describe('method', () => {
    context('members/none file', () => {
      const tester = testerFor({
        fileName: 'members/methods',
        type: 'declarations/class',
        factoryName: 'class.method',
        traverse: (statements: any[]) => {
          // find first getter
          return statements[0].members[1]
        }
      })

      const query: any = {
        names: {
          hasAny: {
            anyOf: ['y', 'x']
          },
          notAny: {
            anyOf: ['a', 'b']
          },
          notAll: {
            allOf: ['y', 'x']
          },
          haveAll: {
            allOf: ['y']
          }
        },
        parameters: {
          hasAny: {
            anyOf: ['v', 'x']
          },
          notAny: {
            anyOf: ['a', 'b']
          },
          notAll: {
            allOf: ['v', 'x']
          },
          haveAll: {
            allOf: ['v']
          }
        }
      }

      describe('info', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            "parameters": {},
            "returnType": "void",
            "returnCount": 1,
            "lastStatementReturn": false,
            "arrow": false,
            "nestedLevels": 1,
            "name": "y",
          })
        })
      })

      describe('testName(query)', () => {
        it('name: notAny: false', () => {
          const res = tester.testName(query.names.notAny)
          expect(res).toBe(false)
        })

        it('name: hasAny: true', () => {
          const res = tester.testName(query.names.hasAny)
          expect(res).toBe(true)
        })

        it('name: notAll: false', () => {
          const res = tester.testName(query.names.notAll)
          expect(res).toBe(false)
        })

        it('name: hasAll: true', () => {
          const res = tester.testName(query.names.hasAll)
          expect(res).toBe(true)
        })
      })

      describe('testParameters(query)', () => {
        it('parameters: notAny: false', () => {
          const res = tester.testParameters(query.parameters.notAny)
          expect(res).toBe(false)
        })

        it('parameters: hasAny: false', () => {
          const res = tester.testParameters(query.parameters.hasAny)
          expect(res).toBe(true)
        })
      })
    })
  })
})
