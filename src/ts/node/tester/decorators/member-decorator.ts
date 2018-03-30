import { DecoratorNodeTester } from './decorator';


export function createMemberDecoratorTester(node: any, options: any = {}): MemberDecoratorTester {
  return new MemberDecoratorTester(node, options)
}

export class MemberDecoratorTester extends DecoratorNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  get type() {
    return 'member'
  }
}
