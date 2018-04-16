import * as ts from 'typescript'
import {
  testName,
  testNames,
  testValue,
  initializerDetails,
  IInitializerDetails,
} from '../../../util'

import { TypeNodeTester } from '../../../type'
import { api } from '../../../../details'
import { BaseNodeTester } from '../../../base'

export function isParameter(node: any) {
  return ts.isParameter(node)
}

/**
 * Factory for creating Parameter tester
 * @param node parameter node to test
 * @param options extra options
 */
export function createParameterTester(node: any, options: any = {}) {
  // if (!isParameter(node)) return
  return new ParameterTester(node, options)
}

/**
 * Parameter tester
 */
export class ParameterTester extends BaseNodeTester {
  typeNodeTester: TypeNodeTester
  accessTester: api.access.AccessTester

  /**
   * Create Parameter tester
   * @param node parameter node to test
   * @param options extra options
   */
  constructor(node: any, options: any) {
    super(node, options)
  }

  get qprops() {
    return ['name', 'initializer', 'access', 'decorators', 'type']
  }

  get testerMap() {
    return {
      type: 'type',
      access: 'access',
      id: 'identifier',
    }
  }

  get testMethodMap() {
    return {
      name: {
        name: 'id',
        test: 'testName',
      },
      initializer: this.testInitializer,
      decorators: this.testDecorators,
      type: this.testType,
    }
  }

  /**
   * id Tester
   */
  get idNodeTester() {
    return this.getTester('id')
  }

  /**
   * Get name of functon if available
   */
  get name(): string | undefined {
    return this.getProp({
      name: 'id',
      prop: 'name',
    })
  }

  /**
   * Collect info for Parameter node
   */
  info() {
    return {
      name: this.name,
      type: this.type,
      initializer: this.initializerInfo,
    }
  }

  get type() {
    return this.getProp({
      name: 'type',
      prop: 'typeName',
      default: 'implicit:any',
    })
  }

  /**
   * Whether function is named
   */
  get isNamed(): boolean {
    return Boolean(this.idNodeTester)
  }

  /**
   * Query the parameter type
   * @param type the type node
   * @param query query
   */
  queryType(type: any, query: any) {
    return this.queryName(type, query.type)
  }

  /**
   * Query a value
   * @param value
   * @param query
   */
  queryValue(value: any, query: any) {
    query = query.value || query
    return testValue(value, query.value)
  }

  /**
   * Query initializer info collected
   * @param query the query
   */
  testInitializer(query: any) {
    query = query.initializer || query
    const init = this.initializerInfo as IInitializerDetails
    return {
      type: this.queryType(init.type, query.type),
      value: this.queryValue(init.value, query.value),
    }
  }

  /**
   * Gather initializer info for parameter
   */
  get initializerInfo() {
    return initializerDetails(this.node)
  }

  /**
   * the initializer node of the parameter
   */
  get initializer() {
    return this.node.initializer
  }

  /**
   * The decorators of the parameter node
   */
  get decorators() {
    return this.node.decorators
  }

  /**
   * Query the decorators of the parameter node
   * @param query
   */
  testDecorators(query: any) {
    query = query.decorators || query
    return testNames(this.decorators, query)
  }

  /**
   * TODO
   * @param query
   */
  testType(query: any) {
    return false
  }
}
