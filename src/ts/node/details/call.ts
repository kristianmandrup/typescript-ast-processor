import { CheckModifier } from './generic'
import { BaseDetailsTester } from './base';

export class CallTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.checkers = new CheckModifier(options).call
  }
}
