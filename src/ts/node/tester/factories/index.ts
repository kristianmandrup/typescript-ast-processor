import { factories } from './map'
import {
  callFun
} from '../../../util'

import {
  INodeTester
} from '../base'

export type INodeTesterFactory = (node: any, options: any) => INodeTester

export {
  factories as map
}

export function testerFactoryFor(name: string, $factoryMap?: any): INodeTesterFactory {
  $factoryMap = $factoryMap || factories
  return $factoryMap[name]
}

export function createTester(factoryName: string, node: any, options: any = {}): INodeTester | undefined {
  options.factories = options.factories || {}
  const factoryMap = options.factories.tester.map
  const testerFactory = testerFactoryFor(factoryName, factoryMap)
  // console.log('createTester', {
  //   testerFactory,
  //   factoryName,
  //   factoryMap
  // })
  return callFun(testerFactory, node, options)
}
