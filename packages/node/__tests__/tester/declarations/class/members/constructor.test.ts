import {
  testerFor,
  query,
  context,
  logObj
} from '../_imports'

const { log } = console

describe('class', () => {
  describe('members', () => {
    describe('constructor', () => {
      context('members/constructor file', () => {
        const tester = testerFor({
          fileName: 'members/constructor',
          type: 'declarations/class',
          factoryName: 'class.constructor',
          traverse: (statements: any[]) => {
            // find constructor
            return statements[0].members[0]
          }
        })

        const query: any = {
          noMatch: {
            params: {
              names: {
                anyOf: ['unknown']
              }
            }
          },
          anyOf: {
            params: {
              names: {
                anyOf: ['name']
              }
            }
          }
        }

        describe('info', () => {
          it('collects correct info', () => {
            const info = tester.info()
            logObj('info', info)
            expect(info).toEqual({
              "parameters": {},
              "returnType": "implicit:any",
              "returnCount": 1,
              "lastStatementReturn": false,
              "arrow": false,
              "nestedLevels": 1,
              "name": "constructor",
              "exported": false
            })
          })
        })

        describe.skip('not', () => {
          describe('testConstructor(query)', () => {
            it('not anyOf: name - true', () => {
              const result = tester.testConstructor(query.anyOf)
              expect(result).toBe(true)
            })
          })
        })

        describe.skip('query(query)', () => {
          it('members: anyOf: Ix, Iy - false', () => {
            const res = tester.query(query.anyOf)
            expect(res.implements).toEqual(['Ix'])
            expect(res.result).toBe(true)
          })
        })

        describe.skip('test(query)', () => {
          it('members: anyOf: Ix, Iy - false', () => {
            const res = tester.test(query.anyOf)
            expect(res).toBe(true)
          })
        })
      })
    })
  })
})

