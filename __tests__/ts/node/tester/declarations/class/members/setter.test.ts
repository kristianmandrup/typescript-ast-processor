import {
  testerFor,
  query,
  context,
  logObj
} from '../_imports'

const { log } = console

describe('class', () => {
  describe('setter', () => {
    context('members/setter file', () => {
      const tester = testerFor({
        fileName: 'members/setter',
        type: 'declarations/class',
        factoryName: 'class.setter',
        traverse: (statements: any[]) => {
          // find first getter
          return statements[0].members[1]
        }
      })

      const query = {
        binary: {
          notMatch: {
            not: {
              name: 'unknown'
            }
          }
        },
        matches: {
          match: {
            name: 'name',
            access: {
              exactly: 'protected',
            }
          },
          noMatch: {
            name: 'unknown',
          }
        },
        access: {
          exactly: 'protected',
          anyOf: [
            'private', 'public'
          ],
          notAny: [
            'public'
          ]
        },
        name: {
          hasAny: {
            anyOf: ['name']
          },
          notAny: {
            anyOf: ['unknown']
          },
          hasAll: {
            allOf: ['name']
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
            "name": "name",
            "parameters": {},
            "returnType": "implicit:any",
            "returnCount": 1,
            "lastStatementReturn": false,
            "exported": false,
            "arrow": false,
            "nestedLevels": 1
          })
        })
      })

      describe('not', () => {
        describe('test(query)', () => {
          it('not anyOf: A - true', () => {
            const result = tester.test(query.binary.notMatch)
            expect(result).toBe(true)
          })
        })
      })

      describe('testAccess(query)', () => {
        context('has getter and setter for name', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testAccess(query.access.anyOf)
            log('should match', { res })
            expect(res).not.toBe(false)
            expect(res.result).toBe(true)
          })
        })

        context('has no matching accessors for unknown', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testAccess(query.access.exactly)
            log('no match', { res })
            expect(res).toBe(false)
          })
        })
      })

      describe('test(query)', () => {
        it('anyOf: Ix, Iy - false', () => {
          const res = tester.test(query.matches.match)
          expect(res).toBe(true)
        })
      })

      describe('query(query)', () => {
        it('anyOf: Ix, Iy - false', () => {
          const res = tester.query(query.matches.match)
          expect(res.implements).toEqual(['Ix'])
          expect(res.result).toBe(true)
        })
      })
    })
  })
})
