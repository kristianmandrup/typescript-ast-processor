import { CheckModifier } from './generic'
import { BaseDetailsTester } from './base';

export class IdentifierTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.checkers = new CheckModifier(options).identifier
  }
}
