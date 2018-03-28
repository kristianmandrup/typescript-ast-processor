import { FunctionCallNodeTester } from '../functions/call/function-call'


export function createClassDecoratorTester(node: any, options: any = {}): ClassDecoratorTester {
  return new ClassDecoratorTester(node, options)
}

export class ClassDecoratorTester extends FunctionCallNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }
}
