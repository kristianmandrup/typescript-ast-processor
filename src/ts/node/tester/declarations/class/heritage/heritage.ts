import * as ts from 'typescript'
import { BaseNodeTester } from '../../base'
import {
  createClassHeritageClauseTester
} from './clause';
import {
  flatten,
  isEmpty
} from '../../../../util'

export function createClassHeritageTester(node: any, options: any = {}): ClassHeritageTester {
  return new ClassHeritageTester(node, options)
}

export class ClassHeritageTester extends BaseNodeTester {
  _extendNames: string[]
  _implementNames: string[]

  constructor(node: any, options: any) {
    super(node, options)
  }

  info(): any {
    const info: any = {
      implements: this.implements,
      isEmpty: this.isEmpty
    }
    if (this.extends) {
      info.extends = this.extends
    }
    return info
  }

  get isEmpty() {
    return !this.extends && this.implements.number === 0
  }

  get extends() {
    // can only extend a single class!
    return this.extendNames[0]
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

  get heritage(): ts.HeritageClause[] {
    return this.node.heritageClauses || []
  }

  clausesOf(kind: ts.SyntaxKind) {
    if (!this.heritage) return []
    return this.heritage.filter((clause: ts.HeritageClause) => clause.token === kind)
  }

  get extendClauses() {
    return this.clausesOf(ts.SyntaxKind.ExtendsKeyword) || []
  }

  get implementClauses() {
    return this.clausesOf(ts.SyntaxKind.ImplementsKeyword) || []
  }

  createHeritageClauseTester(clause: ts.HeritageClause) {
    return createClassHeritageClauseTester(clause, this.options)
  }

  testClauses(clauses: ts.HeritageClause[], query: any) {
    if (isEmpty(query)) return true
    const mappedClauses: any[] = clauses.map((clause: ts.HeritageClause) => {
      return this.createHeritageClauseTester(clause).test(query)
    })
    const matchingClauses = mappedClauses.filter(val => val)
    return matchingClauses.length > 0 ? matchingClauses : false
  }

  extendsQuery(query: any) {
    return this.testClauses(this.extendClauses, query)
  }

  implementsQuery(query: any) {
    return this.testClauses(this.implementClauses, query)
  }

  testExtends(query: any) {
    const tester = this.extendsQuery.bind(this)
    const result = this.testNot(query, tester)
    return Array.isArray(result) ? result[0] : result
  }

  testImplements(query: any) {
    const tester = this.implementsQuery.bind(this)
    return this.testNot(query, tester)
  }

  test(query: any) {
    const testResult = {
      extends: this.testExtends(query.extends),
      implements: this.testImplements(query.implements)
    }
    return {
      ...testResult,
      result: Boolean(testResult.extends && testResult.implements)
    }
  }
}
