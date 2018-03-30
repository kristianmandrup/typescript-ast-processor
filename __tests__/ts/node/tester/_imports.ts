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

export function logObj(obj: any) {
  log(JSON.stringify(obj, null, 2))
}

const {
  factories
} = node.tester

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
  return
}

function getNode(sourceFile: any, opts: any = {}) {
  const { index, traverse } = opts
  const statements = sourceFile.statements
  const node = traverse ? traverse(statements) : statements[index]
  // console.log('using node:', node)
  return node

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
export function testerFor(fileName: string, options: any = {}): any {
  let {
    factory,
    statementIndex,
    indexMap,
    traverse,
    traversers = {},
    type = 'class'
  } = options
  factory = factory || factories[type]

  statementIndex = statementIndex || resolveStatementIndex(type, fileName)

  const filePath = `${type}/${fileName}.ts`
  const srcFile = loadAstNode(filePath, traverse)

  if (statementIndex || traverse) {
    const node = getNode(srcFile, { index: statementIndex, traverse })
    return factory(node, {
      logging: true
    })
  } else {
    return indexMap.map((label: string, index: number) => {
      const traverser = traversers[label]
      const node = getNode(srcFile, { index, traverser })
      return factory(node, {
        logging: true
      })
    })
  }
}
