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
        const expected = {
          "occurences": {
            "parenthesised": 0,
            "assignment": 0,
            "powerAssignment": 0,
            "multiplyAssignment": 0,
            "plusAssignment": 0,
            "minusAssignment": 0,
            "divideAssignment": 0,
            "percentAssignment": 0,
            "applyPlus": 0,
            "applyMinus": 0,
            "applyPower": 0,
            "lt": 0,
            "lte": 0,
            "gt": 0,
            "gte": 0,
            "eq": 0,
            "notEq": 0,
            "same": 0,
            "notSame": 0,
            "or": 0,
            "and": 0,
            "binaryOr": 0,
            "binaryAnd": 0,
            "instanceOf": 0
          }
        }

        expect(info).toEqual(expected)
      })
    })
  })
})
