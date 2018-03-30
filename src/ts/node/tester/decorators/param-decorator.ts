import { DecoratorNodeTester } from './decorator';


export function createParameterDecoratorTester(node: any, options: any = {}): ParameterDecoratorTester {
  return new ParameterDecoratorTester(node, options)
}

export class ParameterDecoratorTester extends DecoratorNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  get type() {
    return 'property'
  }
}
