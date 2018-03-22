import * as ts from 'typescript'

export class NodeType {
  isWhile(node: any) {
    return ts.isDoStatement(node) || ts.isWhileStatement(node)
  }

  isFor(node: any) {
    return ts.isForStatement(node) || ts.isForInStatement(node) || ts.isForOfStatement(node)
  }

  isLoop(node: any) {
    return this.isFor(node) || this.isWhile(node)
  }

  get loop() {
    const self = this
    return {
      for(node: any) {
        return self.isFor(node)
      },
      while(node: any) {
        return self.isWhile(node)
      },
      loop(node: any) {
        return self.isLoop(node)
      }
    }
  }
}
