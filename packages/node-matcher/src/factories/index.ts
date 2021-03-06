import { factories } from './map'
import { callFun, isFunction } from '../../../util'

import { INodeTester } from '../base'

export type INodeTesterFactory = (node: any, options: any) => INodeTester

export { factories as map }

export function testerFactoryFor(
  name: string,
  $factoryMap?: any,
): INodeTesterFactory {
  $factoryMap = $factoryMap || factories
  return $factoryMap[name]
}

export function createTester(
  factoryName: string,
  node: any,
  options: any = {},
): INodeTester | undefined {
  options.factories = options.factories || {}

  if (!options.factories.node) {
    console.error('missing node factories', {
      factories: options.factories,
    })
    throw Error('oops')
  }

  const factoryMap = options.factories.node.map
  const testerFactory = testerFactoryFor(factoryName, factoryMap)
  // console.log('createTester', {
  //   testerFactory,
  //   factoryName,
  //   factoryMap
  // })
  if (!isFunction(testerFactory)) {
    const msg =
      'createTester: testerFactory not a function. Could not find or create tester via factory'
    console.error(msg, {
      factory: factoryName,
      factoryMap,
      testerFactory,
    })
    throw new Error('Could not find or create tester via factory')
  }

  const tester = callFun(testerFactory, node, options)
  // tester.init()
  return tester
}
