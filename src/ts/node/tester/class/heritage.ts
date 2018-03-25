import * as ts from 'typescript'
import { BaseTester } from '../base'
import {
  HeritageClauseTester,
  createClassHeritageClauseTester
} from './heritage-clause';
import {
  flatten,
  isEmpty
} from '../../../util'

export {
  HeritageClauseTester,
  createClassHeritageClauseTester
}

export function createClassHeritageTester(node: any, options: any = {}) {
  return new ClassHeritageTester(node, options)
}

export class ClassHeritageTester extends BaseTester {
  _extendNames: string[]
  _implementNames: string[]

  constructor(node: any, options: any) {
    super(node, options)
  }

  info() {
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
    return new HeritageClauseTester(clause, this.options)
  }

  testClauses(clauses: ts.HeritageClause[], query: any) {
    if (isEmpty(query)) return true
    const mappedClauses: any[] = clauses.map((clause: ts.HeritageClause) => {
      return this.createHeritageClauseTester(clause).test(query)
    })
    const matchingClauses = mappedClauses.filter(val => val)
    return matchingClauses.length > 0 ? matchingClauses : false
  }

  testExtends(query: any) {
    const matches = this.testClauses(this.extendClauses, query)
    return matches ? matches[0] : false
  }

  testImplements(query: any) {
    return this.testClauses(this.implementClauses, query)
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
