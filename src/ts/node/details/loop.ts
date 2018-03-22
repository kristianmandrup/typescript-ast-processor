
import { NodeType } from './generic'
import { BaseDetailsTester } from './base';

export class ConditionalTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.checkers = new NodeType().loop
  }
}
