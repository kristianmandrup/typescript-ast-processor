import * as ts from 'typescript'

/**
 * Utility to determine if arrow function has parenthesis around arguments
 * @param node
 */
export function hasParensAroundArguments(node: ts.FunctionLike) {
  if (ts.isArrowFunction(node)) {
    return (
      node.parameters.length !== 1 ||
      node
        .getText()
        .substr(0, node.equalsGreaterThanToken.getStart() - node.getStart())
        .includes('(')
    );
  } else {
    return true;
  }
}
