import * as ts from 'typescript'
import { BaseNodeTester } from '../../../base'
import {
  isEmpty,
  capitalize,
  pluralize,
  singularize,
} from '../../../../../util'

export function createClassMembersTester(node: any, options: any = {}) {
  return new ClassMembersTester(node, options)
}

import { memberType } from './types'

export class ClassMembersTester extends BaseNodeTester {
  nodes: any[]
  accessors: any[]
  getters: any[]
  setters: any[]
  methods: any[]
  properties: any[]
  constructors: any[]

  /**
   *
   * @param node a Members collection
   * @param options
   */
  constructor(node: any, options: any) {
    super(node, options)
    this.init(node)
  }

  /**
   * TODO: cleanup!!
   * @param node
   */
  init(node: any) {
    this.nodes = this.validatedMembers(node)
  }

  /**
   * Find members of node and validate them
   * @param node
   */
  validatedMembers(node: any) {
    const members = Array.isArray(node) ? node : node.members
    this.isValidMembers(members) ||
      this.error('ClassMembersTester: invalid members node', {
        node,
        members,
      })
    return members
  }

  /**
   * Check is valid list of class members
   * @param members
   */
  isValidMembers(members: any) {
    return Array.isArray(members)
  }

  // alias
  get members() {
    return this.nodes
  }

  /**
   * Query properties
   */
  get qprops() {
    return [
      'properties',
      'accessors',
      'methods',
      'getters',
      'setters',
      'properties',
      'constructors',
    ]
  }

  /**
   * Initialize info properties
   */
  initInfoProps() {
    this.qprops.map((name: string) => {
      const plural = pluralize(name)
      const singular = singularize(name)
      this[plural] = this.membersOf(memberType[singular])
    })
    this.accessors = this.getters.concat(this.setters)
  }

  /**
   * Creates methods of the form:
   * - testXYZ(query)
   * Using props
   */
  initPropTesters() {
    this.qprops.map((name: string) => {
      const fnName = `test${capitalize(name)}`
      const fn = (query: any) => {
        return this._testMembers(this[name], query)
      }
      this[fnName] = fn.bind(this)
    })
  }

  /**
   * Create a member node tester
   * @param member
   */
  createMemberTester(member: any) {
    return this.createTester('class.member', member, this.options)
  }

  /**
   * Retrieve node has members of specific kind
   * @param kind
   */
  membersOf(kind: ts.SyntaxKind) {
    if (!this.members) return []
    return this.members.filter((member: any) => {
      return member.kind === kind
    })
  }

  protected _testMembers(members: any[], query: any) {
    if (isEmpty(query)) return true
    const mappedMembers: any[] = members.map((member: any) => {
      const memberTester = this.createMemberTester(member)
      if (!memberTester) {
        return this.error(
          'ClassMembersTester: no tester registered for member',
          {
            member,
          },
        )
      }
      return memberTester.test(query)
    })
    const matchingMembers = mappedMembers.filter((val) => val)
    return matchingMembers.length > 0 ? matchingMembers : false
  }
}
