import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class ConditionalTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get syntaxMap() {
    return {
      if: ts.SyntaxKind.IfKeyword,
      else: ts.SyntaxKind.ElseKeyword,
      switch: ts.SyntaxKind.SwitchKeyword
    }
  }

  if(node?: any) {
    return this.has('if', { node })
  }

  else(node?: any) {
    return this.has('else', { node })
  }

  switch(node?: any) {
    return this.has('switch', { node })
  }
}
