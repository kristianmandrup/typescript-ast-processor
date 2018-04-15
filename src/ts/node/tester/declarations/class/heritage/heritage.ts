import * as ts from 'typescript'
import { BaseNodeTester } from '../../../base'
import { createClassHeritageClauseTester } from './clause'
import { flatten, isEmpty } from '../../../../../util'

export function createClassHeritageTester(
  node: any,
  options: any = {},
): ClassHeritageTester {
  return new ClassHeritageTester(node, options)
}

export class ClassHeritageTester extends BaseNodeTester {
  extendNames: string[]
  implementNames: string[]
  implements: any
  heritage: any[]

  constructor(node: any, options: any) {
    super(node, options)
  }

  init(node: any) {
    this.implementNames = this.resolveImplementNames()
    this.implements = this.resolveImplements()
    this.extendNames = this.resolveExtendNames()
    this.heritage = this.heritageClauses
  }

  get heritageClauses() {
    return this.node.heritageClauses || []
  }

  info(): any {
    const info: any = {
      implements: this.implements,
      isEmpty: this.isEmpty,
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

  protected resolveImplements() {
    return {
      names: this.implementNames,
      number: this.implementNames.length,
    }
  }

  protected resolveImplementNames() {
    return this.namesOf(this.implementClauses)
  }

  protected resolveExtendNames() {
    return this.namesOf(this.extendClauses)
  }

  protected namesOf(clauses: ts.HeritageClause[]) {
    return flatten(
      clauses.map((extendClause: ts.HeritageClause) => {
        return this.createHeritageClauseTester(extendClause).names
      }),
    )
  }

  /**
   * Get heritage clauses of a specific kind (ie. SyntaxKind) either:
   * - ExtendsKeyword
   * - ImplementsKeyword
   * @param kind
   */
  protected clausesOf(kind: ts.SyntaxKind) {
    if (!this.heritage) return []
    return this.heritage.filter(
      (clause: ts.HeritageClause) => clause.token === kind,
    )
  }

  /**
   * Get extends clauses
   */
  get extendClauses() {
    return this.clausesOf(ts.SyntaxKind.ExtendsKeyword) || []
  }

  /**
   * Get implements clauses
   */
  get implementClauses() {
    return this.clausesOf(ts.SyntaxKind.ImplementsKeyword) || []
  }

  /**
   * Create node tester for a heritage clause node
   * @param clause
   */
  createHeritageClauseTester(clause: ts.HeritageClause) {
    return createClassHeritageClauseTester(clause, this.options)
  }

  /**
   * Test heritage clauses
   * @param clauses
   * @param query
   */
  testClauses(clauses: ts.HeritageClause[], query: any) {
    if (isEmpty(query)) return true
    const mappedClauses: any[] = clauses.map((clause: ts.HeritageClause) => {
      return this.createHeritageClauseTester(clause).test(query)
    })
    const matchingClauses = mappedClauses.filter((val) => val)
    return matchingClauses.length > 0 ? matchingClauses : false
  }

  /**
   * Query for matching extends clauses
   * @param query
   */
  extendsQuery(query: any) {
    return this.testClauses(this.extendClauses, query)
  }

  /**
   * Query for matching implements clauses
   * @param query
   */
  implementsQuery(query: any) {
    return this.testClauses(this.implementClauses, query)
  }

  /**
   * Test if extends clauses match query
   * @param query
   */
  testExtends(query: any) {
    const tester = this.extendsQuery.bind(this)
    const result = this.testNot(query, tester)
    return Array.isArray(result) ? result[0] : result
  }

  /**
   * Test if implements clauses match query
   * @param query
   */
  testImplements(query: any) {
    const tester = this.implementsQuery.bind(this)
    return this.testNot(query, tester)
  }

  /**
   * Test if node matches query
   * @param query
   */
  test(query: any) {
    const result = this.query(query)
    return Boolean(result.extends && result.implements)
  }

  /**
   * Execute query on heritage clauses
   * @param query
   */
  query(query: any) {
    return {
      extends: this.testExtends(query.extends),
      implements: this.testImplements(query.implements),
    }
  }
}
