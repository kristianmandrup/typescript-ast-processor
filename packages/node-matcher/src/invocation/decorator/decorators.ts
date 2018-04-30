import { NodeListTester } from '../../generic'

export function createClassDecoratorsTester(
  node: any,
  options: any = {},
): ClassDecoratorsTester {
  return new ClassDecoratorsTester(node, options)
}

export class ClassDecoratorsTester extends NodeListTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  createClassDecoratorTester(decoratorNode: any) {
    return this.createNodeTester('decorator.class', decoratorNode, this.options)
  }
}
