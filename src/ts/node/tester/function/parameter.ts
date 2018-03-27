import * as ts from 'typescript'
import { IndentifierNodeTester } from '../identifier';
import {
  testName,
  testNames,
  testValue
} from '../util'

export function isParameter(node: any) {
  return ts.isParameter(node)
}

export function createParameterTester(node: any, options: any = {}) {
  if (!isParameter(node)) return
  return new ParameterTester(node, options)
}

export class ParameterTester extends IndentifierNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  info() {
    return {

    }
  }

  test(query: any) {
    return this.testType(query.type) &&
      this.testName(query.name) &&
      this.testInitializer(query.initializer) &&
      this.testDecorator(query.decorators)
  }

  queryType(type: any, query: any) {
    query = query.type || query
    return testName(type, query)
  }

  queryValue(value: any, query: any) {
    query = query.value || query
    return testValue(value, query.value)
  }

  testInitializer(query: any) {
    query = query.initializer || query
    const init = this.initializer
    return {
      type: this.queryType(init.type, query.type),
      value: this.queryValue(init.value, query.value),
    }
  }

  get initializer() {
    return this.node.initializer
  }

  get decorators() {
    return this.node.decorators
  }

  testDecorator(query: any) {
    query = query.decorators || query
    return testNames(this.decorators, query)
  }
}
