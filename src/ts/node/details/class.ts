import { CheckModifier } from './generic'
import { BaseDetailsTester } from './base';

export class ClassTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.checkers = new CheckModifier(options).class
  }
}
