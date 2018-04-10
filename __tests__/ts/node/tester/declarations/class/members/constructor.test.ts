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
              const result = tester.testConstructor(query.members.constructor.anyOf)
              expect(result).toBe(true)
            })
          })
        })
      })
    })
  })
})

