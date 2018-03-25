import * as ts from 'typescript'
import { BaseTester } from '../base'
import { HeritageClauseTester } from './heritage-clause';
import {
  flatten,
  isEmpty
} from '../../../util'
export class ClassHeritageTester extends BaseTester {
  _extendNames: string[]
  _implementNames: string[]

  constructor(node: any, options: any) {
    super(node, options)
  }

  info() {
    return {
      extends: this.extends,
      implements: this.implements,
      isEmpty: this.isEmpty
    }
  }

  get isEmpty() {
    return isEmpty(this.extends) && this.implements.number === 0
  }

  get extends() {
    return this.extendNames
  }

  get implements() {
    return {
      names: this.implementNames,
      number: this.implementNames.length
    }
  }


  get implementNames() {
    this._implementNames = this._implementNames || this.namesOf(this.implementClauses)
    return this._implementNames
  }

  get extendNames() {
    this._extendNames = this._extendNames || this.namesOf(this.extendClauses)
    return this._extendNames
  }

  namesOf(clauses: ts.HeritageClause[]) {
    return flatten(clauses.map((extendClause: ts.HeritageClause) => {
      return this.createHeritageClauseTester(extendClause).names
    }))
  }

  test(heritageQuery: any) {
    const {
      names,
      list
    } = heritageQuery
    return this.testExtends(heritageQuery.extends) &&
      this.testImplements(heritageQuery.implements)
  }

  get heritage(): ts.HeritageClause[] {
    return this.node.heritageClauses || []
  }

  clausesOf(kind: ts.SyntaxKind) {
    if (!this.heritage) return []
    return this.heritage.filter((clause: ts.HeritageClause) => clause.token === kind)
  }

  get extendClauses() {
    return this.clausesOf(ts.SyntaxKind.ExtendsKeyword)
  }

  get implementClauses() {
    return this.clausesOf(ts.SyntaxKind.ImplementsKeyword)
  }

  createHeritageClauseTester(clause: ts.HeritageClause) {
    return new HeritageClauseTester(clause, this.options)
  }

  testExtends(extendsQuery: any) {
    return this.extendClauses.find((extendClause: ts.HeritageClause) => {
      return this.createHeritageClauseTester(extendClause).test(extendsQuery)
    })
  }

  testImplements(extendsQuery: any) {
    return this.implementClauses.find((implementClause: ts.HeritageClause) => {
      return this.createHeritageClauseTester(implementClause).test(extendsQuery)
    })
  }
}
