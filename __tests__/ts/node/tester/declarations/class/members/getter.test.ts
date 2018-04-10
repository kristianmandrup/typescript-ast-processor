import {
  testerFor,
  query,
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
        noMatch: {
          anyOf: ['unknown']
        },
        anyOf: {
          anyOf: ['name']
        },
        allOf: {
          allOf: ['name']
        },
      }


      describe.only('info', () => {
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

      describe.skip('not', () => {
        describe('testAccess(query)', () => {
          it('not anyOf: A - true', () => {
            const result = tester.testAccess(query.anyOf)
            expect(result).toBe(true)
          })
        })
      })


      describe.skip('testAccess(query)', () => {
        context('has getter and setter for name', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testAccess(query.anyOf)
            log('should match', { res })
            expect(res).not.toBe(false)
            expect(res.result).toBe(true)
          })
        })

        context('has no matching accessors for unknown', () => {
          it('anyOf: name - true ', () => {
            const res = tester.testAccess(query.noMatch)
            log('no match', { res })
            expect(res).toBe(false)
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
