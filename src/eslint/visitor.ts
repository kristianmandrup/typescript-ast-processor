function isExportDecl(node: any) {
  return node.type === 'ExportNamedDeclaration'
}

function isFunctionDeclaration(node: any) {
  return node.type === 'FunctionDeclaration'
}

function isVariableDeclaration(node: any) {
  return node.type === 'VariableDeclaration'
}

function isIdentifier(node: any) {
  return node.type === 'Identifier'
}

function isClassDeclaration(node: any) {
  return node.type === 'ClassDeclaration'
}

function isClassBody(node: any) {
  return node.type === 'ClassBody'
}


function isMethodDefinition(node: any) {
  return node.type === 'MethodDefinition'
}

function extractIdentifier(node: any) {
  return {
    name: node.name
  }
}

function isArrowFunction(node: any) {
  return node.init.type === 'ArrowFunctionExpression'
}


function extractClass(node: any) {
  return {
    superclass: node.superclass,
    name: node.id.name
  }
}

