import {
  callFun
} from '../../util'
import { CheckModifier } from '.';
import { BaseDetailsTester } from './base';

export class AccessTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
    this.checkers = new CheckModifier(options).memberAccess
  }
}
