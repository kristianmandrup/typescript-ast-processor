import * as ts from 'typescript'

/**
 * Find list of all parent blocks for a node
 * Can f.ex be used to determine nesting levels (how many levels deep)
 * @param node
 * @param blocks
 */
export function findParentBlocks(node: any, blocks: any[] = []): any[] {
  const parent = node.parent
  if (!parent || ts.isSourceFile(parent)) return blocks
  if (!ts.isBlock(parent)) {
    blocks.push(parent)
  }
  return findParentBlocks(parent, blocks)
}
