import {
  node,
  fixtureFile,
  createSrcFile
} from '../'
import context from 'jest-plugin-context'

export {
  node,
  context
}

/**
 * Load AST tree from fixtures filePath and retrieve the node to test
 * @param filePath
 * @param traverse
 * @param statementNumber
 */
export function loadAstNode(filePath: string, traverse: Function): any {
  const fixturePath = fixtureFile(filePath)
  return createSrcFile().loadSourceFile(fixturePath).sourceFile
}

const { log } = console

export {
  log
}

export function logObj(msg: string, obj: any) {
  log(msg, JSON.stringify(obj, null, 2))
}

const {
  factories
} = node.tester

const factoryMap = node.defaults.factories

function resolveStatementIndex(type: string, fileName: string): number | undefined {
  if (type === 'class') {
    if (/basic-/.test(fileName)) {
      return 0
    }
    if (/extends-/.test(fileName) || /implements-/.test(fileName)) {
      return 1
    }
    if (/-and-/.test(fileName)) {
      return 3
    }
  }
  return 0
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
    factories: factoryMap // factories.map
  })
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
export function testerFor(options: any = {}): any {
  let {
    fileName,
    factory,
    factoryName,
    statementIndex,
    indexMap,
    traverse,
    traverseToIndex,
    traversers = {},
    type = 'class'
  } = options
  factoryName = factoryName || type
  factory = factory || factories.testerFactoryFor(factoryName, factories.map)

  statementIndex = statementIndex || resolveStatementIndex(type, fileName)

  const filePath = `${type}/${fileName}.ts`
  const srcFile = loadAstNode(filePath, traverse)

  if (!factory) {
    throw new Error(`No such factory in map: ${type}`)
  }

  // console.log('testerFor', { testerFor, options, factory, factories })
  if (indexMap && indexMap.length > 0) {
    return indexMap.reduce((acc: any, label: string, index: number) => {
      const traverse = traversers[label] || traverseToIndex && traverseToIndex(index)

      const tester = resolveTester(srcFile, {
        factory,
        index,
        traverse
      })
      acc[label] = tester
      return acc
    }, {})
  }

  if (!isNaN(statementIndex) || traverse) {
    return resolveTester(srcFile, {
      factory,
      index: statementIndex,
      traverse
    })
  }

  console.error({ options })
  throw new Error('Invalid options. Missing: statementIndex, traverse or indexMap')
}
