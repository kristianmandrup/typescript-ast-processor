// node.heritageClauses
// for each HeritageClause
//  - test .kind is SyntaxKind.HeritageClause
//  - test .token is ImplementsKeyword (108)
//  - test .token is ExportKeyword (84)
//  - test types
//  for each ExpressionWithTypeArguments type
//    - test .kind is SyntaxKind.ExpressionWithTypeArguments
//    - .expression.identifier is the interface implemented

import * as ts from 'typescript'
import { BaseTester } from '../base'
import { ClassMemberTester } from './member';
import { AccessTester } from '../../details/access';

export class ClassHeritageTester extends BaseTester {
  // heritage: HeritageTester

  constructor(node: any, options: any) {
    super(node, options)
    // this.heritage = new HeritageTester(node, options)
  }

  test(heritageQuery: any) {
    const {
      names,
      list
    } = heritageQuery
    this.testExtends(heritageQuery.extends)
    this.testImplements(heritageQuery.implements)
  }

  testExtends(extendsQuery: any) {

  }

  testImplements(extendsQuery: any) {

  }
}
