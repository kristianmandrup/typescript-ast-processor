import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('object literal', () => {
  context('object file', () => {
    const tester = testerFor({
      fileName: 'object',
      type: 'literals',
      factoryName: 'lit.object',
      statementIndex: 0
    })

    const query = {
      properties: {
        anyOf: ['name']
      }
    }

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          properties: [
            'name',
            'coords'
          ]
        })
      })
    })

    describe('test(query)', () => {
      it('queries object for properties', () => {
        const result = tester.test(query)
        expect(result).toBeTruthy()
      })
    })
  })
})
