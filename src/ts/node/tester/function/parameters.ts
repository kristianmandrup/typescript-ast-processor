import * as ts from 'typescript'
import { BaseTester } from '../base'
import {
  ParameterTester,
  isParameter
} from './parameter';
import {
  nameOf,
  idDetails,
  typeName,
  // testName,
  testNames,
  decoratorName
} from '../util'
import { ListTester } from '../generic/list';


function isParameters(nodes: any[], options: any = {}) {
  const {
    error
  } = options
  if (!nodes.every(isParameter)) {
    error && error('All nodes must be parameters', {
      nodes
    })
  }
}

export function createParametersTester(node: any, options: any = {}) {
  if (!isParameters(node, options)) return
  return new ParameterTester(node, options)
}

export class ParametersTester extends BaseTester {
  parameter: ParameterTester
  nodes: ts.ParameterDeclaration[]

  constructor(nodes: any, options: any) {
    super(nodes, options)
    this.nodes = nodes
  }

  createNamesTesterFor(options: any) {
    return new ListTester(this.node, Object.assign(options, {
      createTester: (nodes: any[]) => {
        return (queryExpr: any) => testNames(nodes, queryExpr)
      }
    }))
  }

  get parameters() {
    return this.nodes
  }

  test(query: any) {
    return this.testNames(query.names) &&
      this.testTypes(query.types) &&
      this.testDecorators(query.decorators)
  }

  createParameterTester(node: any) {
    return new ParameterTester(node, this.options)
  }

  info() {
    return {
      names: this.names,
      types: this.types,
      items: this.items
    }
  }

  get types() {
    return this.parameters.map(typeName) || []
  }

  get decorators() {
    return this.parameters.map(decoratorName) || []
  }

  get names() {
    return this.parameters.map(nameOf) || []
  }

  get items() {
    return this.parameters.map(idDetails) || []
  }

  testNames(query: any) {
    return this.createNamesTesterFor({ items: this.names }).test(query)
  }

  testDecorators(query: any) {
    return this.createNamesTesterFor({ items: this.decorators }).test(query)
  }

  testTypes(query: any) {
    return this.createNamesTesterFor({ items: this.types }).test(query)
  }
}
