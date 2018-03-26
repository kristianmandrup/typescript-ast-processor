import * as ts from 'typescript'
import { IndentifierNodeTester } from '../identifier';

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

  test(parameter: any) {
    const { type, name } = parameter
    return this.testType(type) && this.testName(name)
  }
}
