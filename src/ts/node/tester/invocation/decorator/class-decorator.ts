import { DecoratorNodeTester } from './decorator'

export function createClassDecoratorTester(node: any, options: any = {}): ClassDecoratorTester {
  return new ClassDecoratorTester(node, options)
}

export class ClassDecoratorTester extends DecoratorNodeTester {
  targetNode: any

  constructor(node: any, options: any) {
    super(node, options)
  }

  get type() {
    return 'class'
  }
}
