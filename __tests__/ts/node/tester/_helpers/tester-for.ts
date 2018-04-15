import { node, loadAstNode } from '../../'

const { factories } = node.tester

const factoryMap = node.defaults.factories

function resolveStatementIndex(opts: any = {}): number {
  return opts.statementIndex || 0
}

function getNode(sourceFile: any, opts: any = {}) {
  const { index, traverse } = opts
  const statements = sourceFile.statements
  const node = traverse ? traverse(statements) : statements[index]
  // console.log('using node:', { node, traverse })
  return node
}

function resolveTester(srcFile: string, opts: any = {}) {
  const node = getNode(srcFile, opts)
  return opts.factory(node, {
    logging: true,
    factories: factoryMap, // factories.map
  })
}

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

function resolveFactory(opts: any = {}) {
  let { factory, factoryName, type } = opts
  factoryName = factoryName || type
  factory = factory || factories.testerFactoryFor(factoryName, factories.map)
  if (!factory) {
    throw new Error(`No such factory in map: ${type}`)
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

      const tester = resolveTester(srcFile, { factory, index, traverse })
      acc[label] = tester
      return acc
    }, {})
  }

  if (!isNaN(statementIndex) || traverse) {
    return resolveTester(srcFile, {
      factory,
      index: statementIndex,
      traverse,
    })
  }

  console.error({ opts })
  throw new Error(
    'Invalid options. Missing: statementIndex, traverse or indexMap',
  )
}
