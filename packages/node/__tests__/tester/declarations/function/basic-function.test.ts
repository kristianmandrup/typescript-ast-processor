import {
  testerFor,
  context,
  query,
  logObj,
  log
} from '../_imports'

describe('function declaration', () => {
  describe('basic', () => {
    context('basic-function file', () => {
      const tester: any = testerFor({
        fileName: 'basic-function',
        type: 'function/declaration',
        factoryName: 'function.decl',
        statementIndex: 0
      })
      // export function minus(a: number, b: number) {
      //   return a - b
      // }

      describe('not', () => {
        describe('testMethods(query)', () => {
          it('not anyOf: A - true', () => {
            const result = tester.testParameters({
              not: query.parameters
            })
            expect(result).toBe(true)
          })
        })
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            "name": "minus",
            "parameters": {
              "names": [
                "a",
                "b"
              ],
              "types": [
                "number",
                "number"
              ],
              "items": [
                {
                  "type": "number",
                  "name": "a",
                  "init": {}
                },
                {
                  "type": "number",
                  "name": "b",
                  "init": {
                    "type": "number",
                    "value": 32,
                    "textValue": "32"
                  }
                }
              ]
            },
            "returnType": "any",
            "exported": true
          })
        })
      })

      describe('isAnonymous', () => {
        context('anonymous function node', () => {
          const tester: any = testerFor({
            fileName: 'basic-function',
            type: 'function/declaration',
            factoryName: 'function.decl',
            traverse: (statements: any[]) => {
              // find first getter
              return statements[1] // TODO: go deeper into expression
            }
          })

          it('is anonymous', () => {
            const res = tester.isAnonymous
            expect(res).toBe(true)
          })
        })

        context('named function node', () => {
          const tester: any = testerFor({
            fileName: 'basic-function',
            type: 'function/declaration',
            factoryName: 'function.decl',
            statementIndex: 1
          })

          it('is not anonymous', () => {
            const res = tester.isAnonymous
            expect(res).toBe(false)
          })
        })
      })

      describe('testParameters(query)', () => {
        context('has matching parameter name', () => {

          // TODO: Fix
          // WTF are the query parameters!?
          it('anyOf: name - true ', () => {
            const res = tester.testParameters(query.parameters)
            expect(res.result).toBe(true)
          })
        })

        context.skip('has no matching parameters for unknown', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testParameters(query.parameters)
            log('no match', res)
            expect(res).toBe(false)
          })
        })
      })

      describe.skip('test(query)', () => {
        it('members: anyOf: Ix, Iy - false', () => {
          const res = tester.test(query.parameters)
          // expect(res.implements).toEqual(['Ix'])
          // expect(res.result).toBe(true)
        })
      })
    })
  })
})
