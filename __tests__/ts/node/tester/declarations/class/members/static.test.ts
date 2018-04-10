import {
  testerFor,
  query,
  context,
  node
} from '../_imports'

const { log } = console

describe('class', () => {
  describe('static', () => {
    context('members/static file', () => {
      const tester = testerFor({
        fileName: 'members/static',
        type: 'declarations/class',
        factoryName: 'class.method',
        traverse: (statements: any[]) => {
          // find first static
          return statements[0].members[2]
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

      it('is static', () => {
        expect(tester.isStatic).toBeTruthy()
      })

      describe('info', () => {
        it('collects correct info', () => {
          const info = tester.info()
          // logObj('info', info)
          expect(info.isStatic).toBeTruthy()
        })
      })

      describe('testStatic(query)', () => {
        context('not a static member', () => {
          const tester = testerFor({
            fileName: 'members/static',
            type: 'declarations/class',
            factoryName: 'class.method',
            traverse: (statements: any[]) => {
              // find first static
              return statements[0].members[0]
            }
          })

          it('is static', () => {
            const result = tester.testStatic(true)
            expect(result).toBe(true)
          })

          it('is not not static', () => {
            const result = tester.testStatic(false)
            expect(result).toBe(true)
          })
        })

        context('a non-static member', () => {
          const tester = testerFor({
            fileName: 'members/static',
            type: 'declarations/class',
            factoryName: 'class.method',
            traverse: (statements: any[]) => {
              // find first non-static
              return statements[0].members[1]
            }
          })

          it('is not static', () => {
            const result = tester.testStatic(true)
            expect(result).toBe(true)
          })
        })
      })

      describe('query(query)', () => {
        it('anyOf: Ix, Iy - false', () => {
          const res = tester.query(query.matches.match)
          expect(res.implements).toEqual(['Ix'])
          expect(res.result).toBe(true)
        })
      })

      describe('test(query)', () => {
        it('anyOf: Ix, Iy - false', () => {
          const res = tester.test(query.matches.match)
          expect(res).toBe(true)
        })
      })
    })
  })
})


