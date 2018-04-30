import {
  logObj,
  testerFor,
  context
} from '../../_imports'

describe('expressions: property access', () => {
  context('access file', () => {
    const tester = testerFor({
      fileName: 'access',
      type: 'expressions/property',
      factoryName: 'property.access',
      traverse(statements: any[]) {
        return statements[1].expression.expression
      }
    })

    // query
    const query = {
    }

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
          // name: 'value'
        })
      })
    })
  })
})
