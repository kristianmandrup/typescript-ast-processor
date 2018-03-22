import * as ts from 'typescript'

class NodeMemberTester {
  nodeMemberTest(node: ts.Node, testDef: any = {}): any {
    return this._nodeListMemberTest(node, testDef)
  }

  protected _nodeListMemberTest(node: ts.Node, testDef: any = {}): any {
    let {
      nodeKey,
      method = 'find',
      type,
      memberTest,
      memberKey,
      leafTest
    } = testDef

    const nodeProp = node[nodeKey]
    if (!Array.isArray(nodeProp)) {
      return this._nodeSingularMemberTest(node, testDef)
    }

    // validate is valid/supported Array search method
    if (!['every', 'find'].includes(method)) return

    leafTest = leafTest || `is${type}`

    const defaultMemberTest = (member: ts.Node) => {
      return this.nodeTestFor(member, memberKey, leafTest)
    }

    memberTest = memberTest || defaultMemberTest

    const testMethod = (member: ts.Node) => {
      return memberTest(member)
    }
    const searchFun: any = nodeProp[method]
    return searchFun(testMethod)
  }

  protected nodeTestFor(member: any, memberKey: string, leafTest: Function) {
    return true
    //this.$node.tester.test(member, memberKey, leafTest)
  }

  protected _nodeSingularMemberTest(node: ts.Node, testDef: any = {}) {
    let {
      key,
      type,
      method
    } = testDef

    const nodeProp = node[key]
    if (!nodeProp) return
    if (Array.isArray(nodeProp)) {
      return this._nodeListMemberTest(node, testDef)
    }
    const tsTypeFunName: string = `is${type}`
    const searchFun = method ? method : ts[tsTypeFunName]
    return searchFun(nodeProp)
  }
}