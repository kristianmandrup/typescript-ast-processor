import { DecoratorNodeTester } from './decorator';


export function createMemberDecoratorTester(node: any, options: any = {}): MemberDecoratorNodeTester {
  return new MemberDecoratorNodeTester(node, options)
}

export class MemberDecoratorNodeTester extends DecoratorNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  get type() {
    return 'member'
  }
}
