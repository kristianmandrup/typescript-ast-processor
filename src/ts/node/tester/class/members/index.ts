import * as ts from 'typescript'
import { BaseTester } from '../../base'
import { createClassMemberTester } from './member';
import {
  flatten,
  isEmpty
} from '../../../../util'

export {
  createClassMemberTester
} from './member'

export function createClassMembersTester(node: any, options: any = {}) {
  return new ClassMembersTester(node, options)
}

import {
  memberType
} from './types'

export class ClassMembersTester extends BaseTester {
  nodes: any[]
  _accessors: any[]
  _getters: any[]
  _setters: any[]
  _methods: any[]
  _properties: any[]
  _constructors: any[]

  /**
   *
   * @param node a Members collection
   * @param options
   */
  constructor(node: any, options: any) {
    super(node, options)
    const members = Array.isArray(node) ? node : node.members
    this.isMembersNode(members) || this.error('ClassMembersTester: invalid members node', {
      node
    })
    this.nodes = members
  }

  validMembers(node: any) {
    Array.isArray(node) ? node : node.members
  }

  isMembersNode(node: any) {
    return Array.isArray(node.members)
  }

  // alias
  get members() {
    return this.nodes
  }

  test(query: any): any {
    return this.testProperties(query.properties) &&
      this.testAccessors(query.accessors) &&
      this.testMethods(query.methods)
  }

  createMemberTester(member: any) {
    return createClassMemberTester(member, this.options)
  }

  membersOf(kind: ts.SyntaxKind) {
    if (!this.members) return []
    return this.members.filter((member: any) => {
      return member.kind === kind
    })
  }

  testMembers(members: any[], query: any) {
    if (isEmpty(query)) return true
    const mappedMembers: any[] = members.map((member: any) => {
      const memberTester = this.createMemberTester(member)
      if (!memberTester) {
        return this.error('ClassMembersTester: no tester registered for member', {
          member
        })
      }
      return memberTester.test(query)
    })
    const matchingMembers = mappedMembers.filter(val => val)
    return matchingMembers.length > 0 ? matchingMembers : false
  }

  get accessors() {
    this._accessors = this._accessors || this.getters.concat(this.setters)
    return this._accessors
  }

  get getters() {
    this._getters = this._getters || this.membersOf(memberType.getter)
    return this._getters
  }

  get setters() {
    this._setters = this._setters || this.membersOf(memberType.setter)
    return this._setters
  }

  get methods() {
    this._methods = this._methods || this.membersOf(memberType.method)
    return this._methods
  }

  get properties() {
    this._properties = this._properties || this.membersOf(memberType.property)
    return this._properties
  }

  get constructors() {
    this._constructors = this._constructors || this.membersOf(memberType.constructor)
    return this._constructors
  }

  testProperties(query: any) {
    return this.testMembers(this.properties, query)
  }

  testAccessors(query: any) {
    return this.testMembers(this.accessors, query)
  }

  testMethods(query: any) {
    return this.testMembers(this.methods, query)
  }

  testConstructors(query: any) {
    return this.testMembers(this.methods, query)
  }
}
