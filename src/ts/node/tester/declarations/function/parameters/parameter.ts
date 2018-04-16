import * as ts from 'typescript'
import { IndentifierNodeTester } from '../../../identifier'
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

  init(node: any) {
    this.setAccessTester(node)
      .setNodeTester(node)
      .setIdTester(node)
  }

  get qprops() {
    return ['name', 'initializer', 'access', 'decorators', 'type']
  }

  setTypeTester(node: any): any {
    if (!node.type) return
    this.setTester({
      name: 'type',
      node: node.type,
    })
    return this
  }

  setAccessTester(node: any): any {
    if (!node.access) return
    this.setTester({
      name: 'access',
    })
    return this
  }

  setIdTester(node: any): any {
    if (!node.name) return
    this.setTester({
      name: 'identifier',
    })
    return this
  }

  /**
   * id Tester
   */
  get idNodeTester() {
    return this.getTester({
      name: 'identifier',
    })
  }

  /**
   * Get name of functon if available
   */
  get name(): string | undefined {
    if (!this.idNodeTester) return
    return this.idNodeTester.name
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
    if (!this.typeNodeTester) return 'implicit:any'
    return this.typeNodeTester.typeName
  }

  /**
   * Whether function is named
   */
  get isNamed(): boolean {
    return Boolean(this.idNodeTester)
  }

  /**
   * Test name of parameter
   * @param query
   */
  testName(query: any): boolean {
    if (!query || !this.isNamed) return true
    return this.idNodeTester ? this.idNodeTester.testName(query) : false
  }

  /**
   * Execute query on node
   * TODO: refactor using props
   * @param query
   */
  test(query: any): boolean {
    return false
    //  (
    //   this.testName(query.name) &&
    //   this.testType(query.type) &&
    //   this.testInitializer(query.initializer) &&
    //   this.testDecorators(query.decorators)
    // )
  }

  /**
   * Query the parameter type
   * @param type the type node
   * @param query query
   */
  queryType(type: any, query: any) {
    query = query.type || query
    return testName(type, query)
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
