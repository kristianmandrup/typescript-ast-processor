import * as details from './exports'
import {
  callFun
} from '../../util'

const factories = {
  'expression': details.expression.createExpressionTester,
  'expr.binary': details.binary.createBinaryExprTester,
  'function.call': details.call.createCallTester,
  identifier: details.identifier.createIdentifierTester,
  variable: details.variable.createVariableTester,
  class: details.class.createClassDetailsTester,
  namespace: details.namespace.createNamespaceTester,
  'function': details.function.createFunctionTester,
  access: details.access.createAccessTester,
  type: details.type.createTypeTester
}

export {
  factories as map
}

import {
  isEmpty
} from '../../util'

import {
  IDetailsTester
} from './base'

export type IDetailsTesterFactory = (options: any) => IDetailsTester

export function factoryFor(name: string, $factoryMap?: any): IDetailsTesterFactory {
  $factoryMap = $factoryMap || factories
  return $factoryMap[name]
}

export function createTester(factoryName: string, node: any, options: any = {}): IDetailsTester | undefined {
  const factories = options.factories || options.factories || {}
  if (isEmpty(factories)) {
    throw new Error('createTester: Missing factories')
  }
  const map = factories.details.map
  const testerFactory = factoryFor(factoryName, map)
  if (!testerFactory) {
    console.error('No such factory', {
      factoryName,
      map,
      factories
    })
  }
  const factoryOpts = {
    node,
    ...options
  }
  return callFun(testerFactory, factoryOpts)
}
