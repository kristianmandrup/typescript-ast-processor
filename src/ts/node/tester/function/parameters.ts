import * as ts from 'typescript'
import { BaseTester } from '../base'
import {
  ParameterTester,
  isParameter
} from './parameter';
import {
  nameOf,
  idDetails,
  typeName
} from '../util'


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

  get parameters() {
    return this.nodes
  }

  test(query: any) {
    this.log('ParametersTester: test', query)
    return this.testDecorators(query.decorators) &&
      this.testNames(query.names) &&
      this.testTypes(query.types)
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
    return this.parameters.map(typeName)
  }

  get names() {
    return this.parameters.map(nameOf)
  }

  get items() {
    return this.parameters.map(idDetails)
  }

  testNames(query: any) {
    throw new Error('Not yet implemented')
    // return true
  }

  testDecorators(query: any) {
    return true
  }

  testTypes(query: any) {
    return true
  }
}
