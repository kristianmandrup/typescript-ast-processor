import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('array literal', () => {
  context('array file', () => {
    const tester = testerFor({
      fileName: 'array',
      type: 'literals',
      factoryName: 'lit.array',
      traverse(statements: any[]) {
        return statements[0].expression
      }
    })

    const query = {
      count: {
        min: 1
      }
    }

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          count: 2
        })
      })
    })

    describe('test(query)', () => {
      it('queries for array with at least one element', () => {
        const result = tester.test(query)
        expect(result).toBeTruthy()
      })
    })
  })
})

