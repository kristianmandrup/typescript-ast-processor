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

  get infoPropsMap() {
    return {
      implementNames: this.resolveImplementNames(),
      implements: this.resolveImplements(),
      extendNames: this.resolveExtendNames(),
      heritage: this.heritageClauses,
    }
  }

  /**
   * Get info
   */
  info(): any {
    const info: any = {
      ...super.info(),
      implements: this.implements,
      isEmpty: this.isEmpty,
    }
    if (this.extends) {
      info.extends = this.extends
    }
    return info
  }

  get heritageClauses() {
    return this.node.heritageClauses || []
  }

  /**
   * Whether the heritage is completely "empty", ie. no extends or implements
   */
  get isEmpty() {
    return !this.hasAny
  }

  /**
   * Whether the heritage has any extends or implements
   */
  get hasAny() {
    return this.hasExtends || this.hasAnyImplements
  }

  /**
   * Whether the heritage has any implements
   */
  get hasAnyImplements() {
    return this.implements.number > 0
  }

  /**
   * Whether the heritage has an extends
   */
  get hasExtends() {
    return Boolean(this.extends)
  }

  /**
   * Get info on the extended if any
   * Note: can only extend a single class!
   */
  get extends() {
    return this.extendName
  }

  /**
   * Get the class name extended if any
   */
  get extendName() {
    return this.extendNames[0]
  }

  /**
   * Resolve the implements if any
   */
  protected resolveImplements() {
    return {
      names: this.implementNames,
      number: this.implementNames.length,
    }
  }

  /**
   * Resolve names of interfaces implemented
   */
  protected resolveImplementNames() {
    return this.namesOf(this.implementClauses)
  }

  /**
   * Resolve names of class extended
   */
  protected resolveExtendNames() {
    return this.namesOf(this.extendClauses)
  }

  /**
   * Resolve names of heritage clause
   * @param clause
   */
  protected namesOfClause(clause: ts.HeritageClause) {
    return this.createHeritageClauseTester(clause).names
  }

  /**
   * Resolve the names of each heritage clause
   * @param clauses
   */
  protected namesOf(clauses: ts.HeritageClause[]) {
    return flatten(
      clauses.map((extendClause: ts.HeritageClause) => {
        return this.namesOfClause(extendClause)
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
   * Get the first (only) extends clause if any
   */
  get extendClause() {
    return this.extendClauses[0]
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
}
