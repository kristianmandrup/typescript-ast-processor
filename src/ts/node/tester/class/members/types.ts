import * as ts from 'typescript'

export const memberType = {
  getter: ts.SyntaxKind.GetAccessor,
  setter: ts.SyntaxKind.SetAccessor,
  method: ts.SyntaxKind.MethodDeclaration,
  property: ts.SyntaxKind.PropertyDeclaration,
  constructor: ts.SyntaxKind.Constructor
}

export function isMemberType(node: any, kind: string) {
  return node.kind === memberType[kind]
}
