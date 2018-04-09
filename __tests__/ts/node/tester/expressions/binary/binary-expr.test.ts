import {
  logObj,
  testerFor,
  context
} from '../../_imports'

describe('expressions: binary', () => {
  context('assignment file', () => {
    const tester = testerFor({
      fileName: 'binary',
      type: 'expressions',
      factoryName: 'expr.binary',
      statementIndex: 0
    })

    // query various counts and parenthesis use
    const query = {
      // ???
      parenthesised: true
    }

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          occurences: {
            parenthesised: 1
          }
        })
      })
    })
  })
})
