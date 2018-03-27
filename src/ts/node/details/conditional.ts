import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class ConditionalTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  if(node?: any) {
    return this.has(ts.SyntaxKind.IfKeyword, { node })
  }

  else(node?: any) {
    return this.has(ts.SyntaxKind.ElseKeyword, { node })
  }

  switch(node?: any) {
    return this.has(ts.SyntaxKind.SwitchKeyword, { node })
  }
}
