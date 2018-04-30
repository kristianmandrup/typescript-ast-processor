import {
  testerFor,
  context,
  logObj
} from '../_imports'

const { log } = console

describe('class', () => {
  describe('getter', () => {
    context('getter file', () => {
      const tester = testerFor({
        fileName: 'members/getter',
        type: 'declarations/class',
        factoryName: 'class.getter',
        traverse: (statements: any[]) => {
          // find constructor
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
            "parameters": {},
            "returnType": "implicit:any",
            "returnCount": 1,
            "lastStatementReturn": false,
            "arrow": false,
            "nestedLevels": 1,
            "name": "name",
            "exported": false
          })
        })
      })

      describe('testName(query)', () => {
        it('name: notAny: false', () => {
          const res = tester.testName(query.name.notAny)
          expect(res).toBe(false)
        })

        it('name: hasAny: true', () => {
          const res = tester.testName(query.name.hasAny)
          expect(res).toBe(true)
        })

        it('name: hasAll: true', () => {
          const res = tester.testName(query.name.hasAll)
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

      describe('testAccess(query)', () => {
        context('has matching access', () => {
          const tester = testerFor({
            fileName: 'members/setter',
            type: 'declarations/class',
            factoryName: 'class.setter',
            traverse: (statements: any[]) => {
              // find first setter with matching access for query
              return statements[0].members[0]
            }
          })

          it('anyOf: name - true ', () => {
            const res = tester.testAccess(query.access.anyOf)
            log('should match', { res })
            expect(res).not.toBe(false)
            expect(res.result).toBe(true)
          })
        })

        context('has NO matching access', () => {
          const tester = testerFor({
            fileName: 'members/access',
            type: 'declarations/class',
            factoryName: 'class.setter',
            traverse: (statements: any[]) => {
              // find first setter with non-matching access for query
              return statements[0].members[1]
            }
          })

          it('anyOf: name - true ', () => {
            const res = tester.testAccess(query.access.exactly)
            log('no match', { res })
            expect(res).toBe(false)
          })
        })
      })

      describe('query(query)', () => {
        it('members: anyOf: Ix, Iy - false', () => {
          const res = tester.query(query.matches.match)
          expect(res.implements).toEqual(['Ix'])
          expect(res.result).toBe(true)
        })
      })

      describe('test(query)', () => {
        it('members: anyOf: Ix, Iy - false', () => {
          const res = tester.test(query.matches.noMatch)
          expect(res).toBe(true)
        })
      })
    })
  })
})
