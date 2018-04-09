import {
  logObj,
  testerFor,
  context
} from '../_imports'

function declaration(statements: any[], index: number = 0, declIndex: number = 0) {
  return statements[index].declarationList.declarations[declIndex]
}

describe('object literal properties', () => {
  context('object file', () => {
    const tester = testerFor({
      fileName: 'obj-props',
      type: 'literals',
      factoryName: 'object.properties',
      traverse(statements: any[]) {
        return declaration(statements).initializer.properties
      }
    })

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
  })

  context('object file', () => {
    const tester = testerFor({
      fileName: 'obj-props',
      type: 'literals',
      factoryName: 'object.propAssign',
      traverse(statements: any[]) {
        // property assignment node
        return declaration(statements).initializer.properties[0]
      }
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
