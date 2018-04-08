import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('if then', () => {
  describe('if then', () => {
    context('if-then file', () => {
      const tester = testerFor({
        fileName: 'if-then',
        type: 'statements/conditional',
        factoryName: 'condition.if',
        statementIndex: 0
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            "nestedLevels": 0,
            "conditionalType": "if",
            "else": false
          })
        })
      })
    })
  })

  describe('if then else', () => {
    context('if-then-else file', () => {
      const tester = testerFor({
        fileName: 'if-then-else',
        type: 'statements/conditional',
        factoryName: 'condition.if',
        statementIndex: 1
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            "nestedLevels": 0,
            "conditionalType": "if",
            "else": true
          })
        })
      })
    })
  })
})
