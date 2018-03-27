import * as ts from 'typescript'
import { ListTester } from '../generic'
import { createClassDecoratorTester } from './class-decorator';

export class ClassDecoratorsTester extends ListTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  createClassDecoratorTester(decoratorNode: any) {
    return createClassDecoratorTester(decoratorNode, this.options)
  }

}
