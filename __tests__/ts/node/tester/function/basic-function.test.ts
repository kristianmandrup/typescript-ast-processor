import {
  testerFor,
  context,
  query,
  logObj,
  log
} from './_imports'

describe('function', () => {
  describe('basic', () => {
    context('basic-function file', () => {
      const tester: any = testerFor('basic-function', {
        type: 'function',
        statementIndex: 0
      })
      // export function minus(a: number, b: number) {
      //   return a - b
      // }

      describe.skip('not', () => {
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
          logObj(info)
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

      describe('testParameters(query)', () => {
        context('has matching parameter name', () => {
          it.only('anyOf: name - true ', () => {
            const res = tester.testParameters(query.parameters)
            log('should match', { res })
            expect(res).not.toBe(false)
            // expect(res.result).toBe(true)
          })
        })

        context.skip('has no matching parameters for unknown', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testParameters(query.parameters)
            log('no match', { res })
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
