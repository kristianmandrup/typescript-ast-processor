import { CheckFlag } from './generic'
import { BaseDetailsTester } from './base';

export class NamespaceTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.checkers = new CheckFlag(options).namespace
  }
}
