import {
  logObj,
  testerFor,
  context
} from '../../_imports'

describe('expressions: assignment', () => {
  context('assignment file', () => {
    const tester = testerFor({
      fileName: 'assignment',
      type: 'expressions',
      factoryName: 'expr.assignment',
      statementIndex: 0
    })

    // query name of identifier assigned to
    const query = {
      name: {
        anyOf: ['value']
      }
    }

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          name: 'value'
        })
      })
    })
  })
})
