import { DecoratorNodeTester } from './decorator';


export function createPropertyDecoratorTester(node: any, options: any = {}): PropertyDecoratorTester {
  return new PropertyDecoratorTester(node, options)
}

export class PropertyDecoratorTester extends DecoratorNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  get type() {
    return 'property'
  }
}
