import { CheckModifier } from './generic'
import { BaseDetailsTester } from './base';

export class FunctionTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.checkers = new CheckModifier(options).function
  }
}
