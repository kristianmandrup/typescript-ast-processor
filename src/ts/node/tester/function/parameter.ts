import * as ts from 'typescript'
import { BaseTester } from '../base'

export class ParameterTester extends BaseTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  test(parameter: any) {
    const { type, name } = parameter
    return true
  }
}
