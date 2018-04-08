import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('ternary: condition ? whenTrue : whenFalse', () => {
  context('ternary file', () => {
    const tester = testerFor({
      fileName: 'ternary',
      type: 'statements/conditional',
      factoryName: 'condition.ternary',
      statementIndex: 0
    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          conditionalType: "ternary"
        })
      })
    })
  })
})


