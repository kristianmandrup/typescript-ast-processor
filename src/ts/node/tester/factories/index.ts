import { factories } from './tester'
import {
  callFun
} from '../../../util'

import {
  INodeTester
} from '../base'

export type INodeTesterFactory = (node: any, options: any) => INodeTester

export function testerFactoryFor(name: string, $factoryMap?: any): INodeTesterFactory {
  $factoryMap = $factoryMap || factories
  return $factoryMap[name]
}

export function createTester(factoryName: string, node: any, options: any = {}): INodeTester | undefined {
  options.factories = options.factories || {}
  const testerFactory = testerFactoryFor(factoryName, options.factories.tester)
  return callFun(testerFactory, node, options)
}
