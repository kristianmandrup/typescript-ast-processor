import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('try catch finally statement', () => {
  context('try-catch file', () => {
    const tester = testerFor({
      fileName: 'try-catch',
      type: 'statements/error',
      factoryName: 'error.try',
      statementIndex: 0
    })

    describe('hasCatch', () => {
      it('is true', () => {
        expect(tester.hasCatch).toBeTruthy()
      })
    })

    describe('hasFinally', () => {
      it('is false', () => {
        expect(tester.hasFinally).toBeFalsy()
      })
    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          nestedLevels: 0,
          catch: true,
          finally: false
        })
      })
    })

    describe('testCatch', () => {
      it('that it is true returns true', () => {
        expect(tester.testCatch(true)).toBeTruthy()
      })

      it('that it is false returns false', () => {
        expect(tester.testCatch(false)).toBeFalsy()
      })
    })

    describe('testFinally', () => {
      it('that it is true returns false', () => {
        expect(tester.testFinally(true)).toBeFalsy()
      })

      it('that it is false returns true', () => {
        expect(tester.testFinally(false)).toBeTruthy()
      })
    })
  })

  context('try-catch-finally file', () => {
    const tester = testerFor({
      fileName: 'try-catch-finally',
      type: 'statements/error',
      factoryName: 'error.try',
      statementIndex: 0
    })

    describe('hasCatch', () => {
      it('is true', () => {
        expect(tester.hasCatch).toBeTruthy()
      })
    })

    describe('hasFinally', () => {
      it('is true', () => {
        expect(tester.hasFinally).toBeTruthy()
      })
    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          nestedLevels: 0,
          catch: true,
          finally: true
        })
      })
    })

    describe('testCatch', () => {
      it('that it is true returns true', () => {
        expect(tester.testCatch(true)).toBeTruthy()
      })

      it('that it is false returns false', () => {
        expect(tester.testCatch(false)).toBeFalsy()
      })
    })

    describe('testFinally', () => {
      it('that it is true returns true', () => {
        expect(tester.testFinally(true)).toBeTruthy()
      })

      it('that it is false returns false', () => {
        expect(tester.testFinally(false)).toBeFalsy()
      })
    })
  })
})
