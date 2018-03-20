import * as ts from 'typescript'
import { BaseTester } from '../base'

export class ParameterTester extends BaseTester {
  constructor(options: any) {
    super(options)
  }

  test(parameter: any) {
    const { type, name } = parameter
    return true
  }
}
