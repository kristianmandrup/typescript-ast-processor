import { node, loadAstNode } from '../../'
import { isStr } from '../../../../../src/ts/util'
import { isFunction, isNumber } from 'util'

const { factories } = node.tester

const factoryMap = node.defaults.factories

function resolveStatementIndex(opts: any = {}): number {
  return opts.statementIndex || 0
}

function error(msg: any, data: any) {
  console.error(msg, data)
  throw new Error(msg)
}

/**
 * Retrieve the node to use
 * @param sourceFile
 * @param opts
 */
function getNode(sourceFile: any, opts: any = {}) {
  const { index, traverse } = opts
  const statements = sourceFile.statements
  const node = traverse ? traverse(statements) : statements[index]
  if (!node) {
    error('getNode: could not resolve node for tester', {
      sourceFile,
      opts,
    })
  }
  return node
}

/**
 * Resolve Node tester using source file
 * @param srcFile
 * @param opts
 */
function resolveNodeTester(srcFile: string, opts: any = {}) {
  const node = getNode(srcFile, opts)
  const factory = opts.factory
  const tester = factory(node, {
    logging: true,
    factories: factoryMap, // factories.map
  })
  return tester
}

/**
 * Resolve category based on type
 * @param type
 */
function resolveCategory(type: string): string | undefined {
  switch (type) {
    case 'class':
      return 'declarations'
    case 'block':
    case 'conditional':
    case 'error':
    case 'loops':
      return 'declarations'
    case 'decorators':
    case 'function':
      return 'function-call'
  }
  return
}

/**
 * Resolve Node Tester factory
 * @param opts
 */
function resolveFactory(opts: any = {}) {
  let { factory, factoryName, type } = opts
  if (isStr(factory)) {
    factoryName = factory
  }
  factoryName = factoryName || type
  factory = isFunction(factory)
    ? factory
    : factories.testerFactoryFor(factoryName, factories.map)
  if (!factory) {
    error(`No such factory in map: ${type}`, {
      type,
      factories,
    })
  }
  return factory
}

/**
 * Load the source AST to test
 * @param opts
 */
function loadSrc(opts: any = {}) {
  let { type, category, fileName, traverse } = opts
  category = category || resolveCategory(type)
  type = category ? [category, type].join('/') : type
  const filePath = `${type}/${fileName}.ts`
  return loadAstNode(filePath, traverse)
}

/**
 * Create a tester for a given fileName (ie source file to load and the type of tester)
 * Options:
 *  - traverse: function to traverse to the node to test after loading AST of file
 *  - statementIndex: index of statements if AST is a simple statements list
 *  - type: name of tester factory to lookup in factoryMap
 *  - factory: custom tester factory
 * @param fileName
 * @param options
 */
export function testerFor(opts: any = {}): any {
  const srcFile = loadSrc(opts)
  const factory = resolveFactory(opts)

  const statementIndex = opts.statementIndex || resolveStatementIndex(opts)
  const { indexMap, traversers, traverseToIndex, traverse } = opts
  // console.log('testerFor', { testerFor, options, factory, factories })
  if (indexMap && indexMap.length > 0) {
    return indexMap.reduce((acc: any, label: string, index: number) => {
      const traverse =
        traversers[label] || (traverseToIndex && traverseToIndex(index))

      const tester = resolveNodeTester(srcFile, { factory, index, traverse })
      acc[label] = tester
      return acc
    }, {})
  }

  if (isNumber(statementIndex) || traverse) {
    return resolveNodeTester(srcFile, {
      factory,
      index: statementIndex,
      traverse,
    })
  }

  error(
    'testerFor: Invalid options. Missing: statementIndex, traverse or indexMap',
    { opts },
  )
}
