import * as parser from 'typescript-eslint-parser'
const { parseForESLint } = parser

/**
 * Returns a raw copy of the given AST
 * @param  {Object} ast the AST object
 * @returns {Object}     copy of the AST object
 */
function getRaw(ast: any) {
  return JSON.parse(JSON.stringify(ast, (key, value) => {
    if ((key === "start" || key === "end") && typeof value === "number") {
      return undefined;
    }
    return value;
  }));
}

/**
 * @returns {Object} the AST object
 */
export function parse(code: string, config: any) {
  const ast = parser.parseForESLint(code, config).ast;
  return {
    raw: getRaw(ast),
    json: JSON.stringify(ast, null, 2),
    ast
  }
}
