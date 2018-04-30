import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('switch', () => {
  context('switch file', () => {
    const tester = testerFor({
      fileName: 'switch',
      type: 'statements/conditional',
      factoryName: 'condition.switch',
      statementIndex: 1
    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
        })
      })
    })
  })
})
