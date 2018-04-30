import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('for loop', () => {
  describe('classic for', () => {
    context('for file', () => {
      const tester = testerFor({
        fileName: 'for/for',
        type: 'statements/loops',
        factoryName: 'loop.for',
        statementIndex: 1
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            "nestedLevels": 0,
            "loop": true,
            "loopType": "for",
            "for": true,
            "forOf": false,
            "forIn": false,
            "forType": "for"
          }
          )
        })
      })

    })
  })

  describe('for of', () => {
    context('for-of file', () => {
      const tester = testerFor({
        fileName: 'for/for-of',
        type: 'statements/loops',
        factoryName: 'loop.for',
        statementIndex: 1
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            "nestedLevels": 0,
            "loop": true,
            "loopType": "for",
            "for": false,
            "forOf": true,
            "forIn": false,
            "forType": "of"
          }
          )
        })
      })
    })
  })

  describe('for in', () => {
    context('for-in file', () => {
      const tester = testerFor({
        fileName: 'for/for-in',
        type: 'statements/loops',
        factoryName: 'loop.for',
        statementIndex: 1
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            "nestedLevels": 0,
            "loop": true,
            "loopType": "for",
            "for": false,
            "forOf": false,
            "forIn": true,
            "forType": "in"
          }
          )
        })
      })
    })
  })
})




