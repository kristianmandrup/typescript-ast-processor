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

      const query: any = {
        noMatch: {
          anyOf: ['unknown']
        },
        anyOf: {
          anyOf: ['hello']
        },
        allOf: {
          allOf: ['hello']
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

      describe.skip('not', () => {
        describe('testStatics(query)', () => {
          it('not anyOf: A - true', () => {
            const result = tester.testStatics(query.anyOf)
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


