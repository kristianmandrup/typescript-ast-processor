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
            const result = tester.testStatics(query.members.statics.anyOf)
            expect(result).toBe(true)
          })
        })
      })
    })
  })
})


