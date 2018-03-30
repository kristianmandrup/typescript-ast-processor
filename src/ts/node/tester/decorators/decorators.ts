import { ListTester } from '../generic'
import { createClassDecoratorTester } from './class-decorator';

export function createClassDecoratorsTester(node: any, options: any = {}): ClassDecoratorsTester {
  return new ClassDecoratorsTester(node, options)
}

export class ClassDecoratorsTester extends ListTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  createClassDecoratorTester(decoratorNode: any) {
    return createClassDecoratorTester(decoratorNode, this.options)
  }
}
