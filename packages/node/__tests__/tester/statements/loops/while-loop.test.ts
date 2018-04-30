import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('while loop', () => {
  describe('while do', () => {
    context('while-do file', () => {
      const tester = testerFor({
        fileName: 'while/while-do',
        type: 'statements/loops',
        factoryName: 'loop.while',
        statementIndex: 0
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          const expected = {
            "nestedLevels": 0,
            "loop": true,
            "loopType": "while",
            "whileType": "whileDo",
            "whileThen": true,
            "doWhile": false
          }

          logObj('info', info)
          expect(info).toEqual(expected)
        })
      })

    })
  })

  describe('do while', () => {
    context('do-while file', () => {
      const tester = testerFor({
        fileName: 'while/do-while',
        type: 'statements/loops',
        factoryName: 'loop.while',
        statementIndex: 0
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          const expected = {
            "nestedLevels": 0,
            "loop": true,
            "loopType": "while",
            "whileType": "doWhile",
            "whileThen": false,
            "doWhile": true
          }
          logObj('info', info)
          expect(info).toEqual(expected)
        })
      })
    })
  })
})
