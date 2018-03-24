import { CheckModifier } from './generic'
import { BaseDetailsTester } from './base';

export class CallTester extends BaseDetailsTester {
  modifier: CheckModifier
  literal: any
  node: any

  constructor(options: any) {
    super(options)
    this.modifier = new CheckModifier(options)
    this.checkers = this.modifier.argument
  }

  // arguments(args: any[]) {

  // }
}
