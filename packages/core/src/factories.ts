import {
  createASTNodeTraverser,
  createCountingASTNodeTraverser
} from './traverser'

import {
  createVisitorFactory
} from './visitor'

import {
  factories as node
} from './node'

export const factories = {
  node,
  visitor: {
    createVisitorFactory
  },
  traverser: {
    createASTNodeTraverser,
    createCountingASTNodeTraverser
  }
}
