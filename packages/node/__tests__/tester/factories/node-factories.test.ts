import { context } from '../_imports'
import {
  testerFactoryFor,
  createTester,
} from '../../../../../src/ts/node/tester/factories'

describe('Node factories', () => {
  const name = 'identifier'
  describe('testerFactoryFor', () => {
    context('empty factory map', () => {
      // testerFactoryFor(
      //   name: string,
      //   $factoryMap?: any,
      // )
      const factoryMap = {}
      const factory = () => testerFactoryFor(name, factoryMap)

      it('does not create a factory', () => {
        expect(factory).toThrow()
      })
    })
  })

  describe('createTester', () => {
    // createTester(
    //   factoryName: string,
    //   node: any,
    //   options: any = {},
    // )
    const node = {}
    const options = {}

    const tester = createTester(name, node, options)

    it('creates a tester', () => {
      expect(tester).toBeDefined()
    })
  })
})
