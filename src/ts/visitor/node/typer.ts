import * as ts from 'typescript'
import {
  categories
} from './types'

export class Typer {
  nodeTypes: any

  constructor(nodeTypes: any) {
    this.nodeTypes = Typer.nodeTypes || nodeTypes
  }

  static nodeTypes = {
    categories,
    all: Object.keys(ts).filter(key => /^is[A-Z]/.test(key)).map(key => key.substr(2))
  }

  outputTypeCheckers(...list: string[]) {
    return list.map(dotPath => {
      return this.typesOfPath(dotPath)
    })
  }

  typesOfPath(dotPath: string) {
    const paths = dotPath.split('.')
    return paths.reduce((acc, path) => {
      return acc[path]
    }, this.nodeTypes.categories)
  }
}

