import { BaseTester } from '../base'
import { ParameterTester } from './parameter';

export class ParametersTester extends BaseTester {
  parameter: ParameterTester

  constructor(node: any, options: any) {
    super(node, options)
    this.parameter = new ParameterTester(node, options)
  }

  test(parameters: any) {
    const {
      decorators,
      types,
      list
    } = parameters
    const method = list.for == 'any' ? 'find' : 'every'

    return this.testDecorators(decorators) &&
      this.testTypes(types) &&
      list.items[method]((parameter: any) => this.parameter.test(parameter))
  }

  testDecorators(decorators: any) {
    const { count, names, types } = decorators
    return true
  }

  testTypes($types: any) {
    const { count, names, types } = $types
    return true
  }
}
