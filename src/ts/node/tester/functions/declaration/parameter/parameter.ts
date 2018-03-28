import * as ts from 'typescript'
import { IndentifierNodeTester } from '../../../identifier';
import {
  testName,
  testNames,
  testValue,
  initializerDetails,
  IInitializerDetails
} from '../../../util'

import { TypeNodeTester } from '../../../type';
import { AccessTester } from '../../../../details';

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
export class ParameterTester extends IndentifierNodeTester {
  typeNodeTester: TypeNodeTester
  accessTester: AccessTester

  /**
   * Create Parameter tester
   * @param node parameter node to test
   * @param options extra options
   */
  constructor(node: any, options: any) {
    super(node, options)
    if (node.type) {
      this.typeNodeTester = new TypeNodeTester(node.type, options)
    }
    if (node.access) {
      this.accessTester = new AccessTester({ ...options, node })
    }
  }

  /**
   * Collect info for Parameter node
   */
  info() {
    return {
      name: this.name,
      type: this.type,
      initializer: this.initializerInfo
    }
  }

  get type() {
    return this.typeNodeTester ? this.typeNodeTester.typeName : 'implicit:any'
  }

  /**
   * Execute query on node
   * @param query
   */
  test(query: any) {
    return this.testName(query.name) &&
      this.testType(query.type) &&
      this.testInitializer(query.initializer) &&
      this.testDecorators(query.decorators)
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
}
